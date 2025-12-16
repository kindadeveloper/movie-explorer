import { PerformanceService } from './performance.service';
import { NgZone } from '@angular/core';

describe('PerformanceService (pure unit)', () => {
    let service: PerformanceService;

    const ngZoneMock: Partial<NgZone> = {
        run: (fn: Function) => fn(),
        runOutsideAngular: (fn: Function) => fn(),
    };

    beforeEach(() => {
        service = new PerformanceService(ngZoneMock as NgZone);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should increment change detection counter', () => {
        service.incrementChangeDetection();
        service.incrementChangeDetection();

        expect(service.cdCount).toBe(2);
    });

    it('should reset metrics and counters', () => {
        service.cdCount = 5;
        service.metrics.ttfrMs = 123;
        service.metrics.memoryUsedMb = 45.6;

        service.reset();

        expect(service.cdCount).toBe(0);
        expect(service.metrics.ttfrMs).toBeNull();
        expect(service.metrics.memoryUsedMb).toBeNull();
    });

    it('should mark first render only once', () => {
        spyOn(performance, 'getEntriesByType').and.returnValue([
        { startTime: 0, responseEnd: 200 } as PerformanceNavigationTiming,
        ]);

        service.markFirstRender();
        service.markFirstRender();

        expect(service.metrics.ttfrMs).toBe(200);
    });

    it('should fallback to performance.now when navigation timing is unavailable', () => {
        spyOn(performance, 'getEntriesByType').and.returnValue([]);
        spyOn(performance, 'now').and.returnValue(150);

        service.markFirstRender();

        expect(service.metrics.ttfrMs).toBe(150);
    });

    it('should not fail if performance.memory is not available', () => {
    spyOnProperty(performance as any, 'memory', 'get').and.returnValue(undefined);

    expect(() => {
        (service as any).updateMemoryUsage();
    }).not.toThrow();

    expect(service.metrics.memoryUsedMb).toBeNull();
    });
});