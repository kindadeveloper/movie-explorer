import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WebWorkersComponent } from './web-workers.component';
import { ChangeDetectorRef } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WebWorkersComponent', () => {
  let component: WebWorkersComponent;
  let fixture: ComponentFixture<WebWorkersComponent>;
  let cdrSpy: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async () => {
    cdrSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    await TestBed.configureTestingModule({
      declarations: [WebWorkersComponent],
      providers: [
        { provide: ChangeDetectorRef, useValue: cdrSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(WebWorkersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ping UI without errors', () => {
    expect(() => component.pingUI()).not.toThrow();
  });

  it('should run computation on main thread when not optimized', () => {
    component.optimized = false;

    spyOn<any>(component, 'calculatePrimes').and.returnValue({
      count: 3,
      last: 5,
    });

    component.startComputation();

    expect(component.running).toBeFalse();
    expect(component.result).toContain('Main Thread');
  });

  it('should use Web Worker when optimized', () => {
    component.optimized = true;

    const postMessageSpy = jasmine.createSpy('postMessage');
    const terminateSpy = jasmine.createSpy('terminate');

    const mockWorker = {
      postMessage: postMessageSpy,
      terminate: terminateSpy,
      onmessage: null as any,
    };

    spyOn(window as any, 'Worker').and.returnValue(mockWorker);

    component.startComputation();

    expect(postMessageSpy).toHaveBeenCalledWith({ limit: 10_000_000 });
    expect(component.running).toBeTrue();

    mockWorker.onmessage({
      data: { count: 42, last: 97 },
    });

    expect(component.running).toBeFalse();
    expect(component.result).toContain('Web Worker');
    expect(terminateSpy).toHaveBeenCalled();
  });
});