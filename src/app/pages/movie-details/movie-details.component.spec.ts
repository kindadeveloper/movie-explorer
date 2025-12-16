import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from '../../core/services/tmdb.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let tmdbServiceSpy: jasmine.SpyObj<TmdbService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    tmdbServiceSpy = jasmine.createSpyObj('TmdbService', [
      'getMovieDetails',
      'getMovieCredits',
      'getMovieVideos',
      'getMovieRecommendations',
      'getMovieReviews',
    ]);

    const mockResponse = {
      details: { id: 1, title: 'Test movie' },
      credits: { cast: [] },
      videos: {
        results: [{ key: 'abc123' }],
      },
      recommendations: [],
      reviews: [],
    };

    tmdbServiceSpy.getMovieDetails.and.returnValue(of(mockResponse.details));
    tmdbServiceSpy.getMovieCredits.and.returnValue(of(mockResponse.credits));
    tmdbServiceSpy.getMovieVideos.and.returnValue(of(mockResponse.videos));
    tmdbServiceSpy.getMovieRecommendations.and.returnValue(of([]));
    tmdbServiceSpy.getMovieReviews.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
              data: {},
            },
          },
        },
        { provide: Router, useValue: routerSpy },
        { provide: TmdbService, useValue: tmdbServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      teardown: { destroyAfterEach: false },
    });
    TestBed.overrideComponent(MovieDetailsComponent, { set: { template: '' } });
    await TestBed.compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movie data in unoptimized mode', () => {
    component.optimized = false;

    component.ngOnInit();

    expect(tmdbServiceSpy.getMovieDetails).toHaveBeenCalledWith(1);
    expect(tmdbServiceSpy.getMovieCredits).toHaveBeenCalledWith(1);
    expect(tmdbServiceSpy.getMovieVideos).toHaveBeenCalledWith(1);
    expect(component.data).toBeTruthy();
  });

  it('should sanitize video urls', () => {
    component.data = {
      videos: {
        results: [{ key: 'video123' }],
      },
    };

    component['sanitizeVideoUrls']();

    const video = component.data.videos.results[0];
    expect(video.safeUrl).toBeTruthy();
  });

  it('should navigate back to change-detection page', () => {
    component.goBack();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/change-detection']);
  });
});