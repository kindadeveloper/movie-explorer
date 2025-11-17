import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RenderTracker } from '../../core/utils/render-tracker.directive';

@Component({
  selector: 'app-web-workers',
  standalone: false,
  templateUrl: './web-workers.component.html',
  styleUrls: ['./web-workers.component.scss'],
  changeDetection: environment.optimized
    ? ChangeDetectionStrategy.OnPush
    : ChangeDetectionStrategy.Default,
})
export class WebWorkersComponent extends RenderTracker {
  private cdr = inject(ChangeDetectorRef);
  optimized = environment.optimized;
  running = false;
  result: string | null = null;

  options = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 }
  ];
  
  selectControl = new FormControl<number | null>(null);

  pingUI() {
    console.log('UI responsive — Ping!', this.selectControl.value);
  }

  startComputation() {
    this.running = true;
    this.result = null;
    const start = performance.now();

    if (this.optimized) {
      const worker = new Worker(
        new URL('./heavy-task.worker', import.meta.url),
        { type: 'module' }
      );
      worker.postMessage({ limit: 10_000_000 });

      worker.onmessage = ({ data }) => {
        const time = (performance.now() - start).toFixed(0);
        this.result = `Completed in ${time} ms (via Web Worker). Found ${data.count} primes (last = ${data.last}).`;
        this.running = false;
        worker.terminate();
        this.cdr.detectChanges();
      };
    } else {
      const result = this.calculatePrimes(10_000_000);
      const time = (performance.now() - start).toFixed(0);
      this.result = `Completed in ${time} ms (Main Thread). Found ${result.count} primes (last = ${result.last}).`;
      this.running = false;
    }
  }

  private calculatePrimes(limit: number) {
    const primes: number[] = [];
    for (let i = 2; i < limit; i++) {
      let isPrime = true;
      for (let j = 2; j * j <= i; j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) primes.push(i);
    }
    return { count: primes.length, last: primes.at(-1) };
  }
}