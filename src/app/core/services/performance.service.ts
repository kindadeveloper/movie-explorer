import { Injectable, NgZone } from '@angular/core';

export interface AppPerformanceMetrics {
  ttfrMs: number | null;
  memoryUsedMb: number | null;
}

@Injectable({ providedIn: 'root' })
export class PerformanceService {
  private ttfrMarked = false;
  cdCount = 0;
  metrics: AppPerformanceMetrics = {
    ttfrMs: null,
    memoryUsedMb: null,
  };

  constructor(private zone: NgZone) {
    if ((performance as any).memory) {
      this.zone.runOutsideAngular(() => {
        setInterval(() => this.updateMemoryUsage(), 2000);
      });
    }
  }

  markFirstRender() {
    if (this.ttfrMarked) return;
    this.ttfrMarked = true;

    const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const ttfr = navTiming
      ? navTiming.responseEnd - navTiming.startTime
      : performance.now();

    this.metrics.ttfrMs = Math.round(ttfr);
  }

  incrementChangeDetection() {
    this.cdCount++;
  }

  reset() {
    this.cdCount = 0;
    this.metrics.ttfrMs = null;
    this.metrics.memoryUsedMb = null;
    this.ttfrMarked = false;
  }

  private updateMemoryUsage() {
    const perfAny = performance as any;
    if (!perfAny.memory) return;

    const usedBytes = perfAny.memory.usedJSHeapSize as number;
    const usedMb = usedBytes / (1024 * 1024);

    this.metrics.memoryUsedMb = Math.round(usedMb * 10) / 10;
  }
}