import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, inject } from '@angular/core';
import { PerformanceService } from '../../core/services/performance.service';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cd-counter',
  standalone: true,
  imports: [TagModule, ButtonModule],
  templateUrl: './cd-counter.component.html',
  styleUrls: ['./cd-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdCounterComponent implements OnInit, OnDestroy {
  private perf = inject(PerformanceService);
  private cdr = inject(ChangeDetectorRef);
  private zone = inject(NgZone);
  private timerId: any;

  cdCount = 0;
  metrics = this.perf.metrics;

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.timerId = setInterval(() => {
        const newCd = this.perf.cdCount;
        const newMetrics = this.perf.metrics;

        if (
          newCd !== this.cdCount ||
          newMetrics.memoryUsedMb !== this.metrics.memoryUsedMb ||
          newMetrics.ttfrMs !== this.metrics.ttfrMs
        ) {
          this.cdCount = newCd;
          this.metrics = { ...newMetrics };
          this.zone.run(() => this.cdr.detectChanges());
        }
      }, 500);
    });
  }

  ngOnDestroy(): void {
    if (this.timerId) clearInterval(this.timerId);
  }

  reset() {
    this.perf.reset();
    this.cdCount = 0;
    this.metrics = { ttfrMs: null, memoryUsedMb: null };
    this.cdr.detectChanges();
  }
}