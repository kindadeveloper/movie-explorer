import { AfterViewChecked, Directive, inject } from '@angular/core';
import { PerformanceService } from '../services/performance.service';

@Directive()
export class RenderTracker implements AfterViewChecked {
  protected perf = inject(PerformanceService);
  
  ngAfterViewChecked() {
    this.perf.incrementChangeDetection();
  }
}
