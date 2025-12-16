import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [MovieCardComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      teardown: { destroyAfterEach: false },
    });

    TestBed.overrideComponent(MovieCardComponent, {
      set: { template: '' },
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to movie details when navigateToDetails is called', () => {
    component.movie = { id: 42 };

    component.navigateToDetails();

    expect(routerSpy.navigate).toHaveBeenCalledWith([
      '/change-detection/movie',
      42,
    ]);
  });

  it('should not throw if optimized flag changes', () => {
    component.optimized = true;
    component.optimized = false;

    expect(component.optimized).toBeFalse();
  });
});