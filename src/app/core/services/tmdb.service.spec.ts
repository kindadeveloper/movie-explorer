import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TmdbService } from './tmdb.service';
import { environment } from '../../../environments/environment';

describe('TmdbService', () => {
  let service: TmdbService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TmdbService],
      teardown: { destroyAfterEach: false },
    });

    service = TestBed.inject(TmdbService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch popular movies with default limit (20)', () => {
    const mockResponse = {
      results: Array.from({ length: 20 }, (_, i) => ({ id: i + 1 })),
    };

    service.getPopularMovies().subscribe(movies => {
      expect(movies.length).toBe(20);
      expect(movies[0].id).toBe(1);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/movie/popular?api_key=${environment.apiKey}&page=1`
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should fetch movie details by id', () => {
    const movieId = 123;
    const mockMovie = { id: movieId, title: 'Test Movie' };

    service.getMovieDetails(movieId).subscribe(movie => {
      expect(movie.id).toBe(movieId);
      expect(movie.title).toBe('Test Movie');
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/movie/${movieId}?api_key=${environment.apiKey}&language=en-US`
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockMovie);
  });

  it('should fetch movie credits', () => {
    const movieId = 456;
    const mockCredits = { cast: [{ name: 'Actor 1' }] };

    service.getMovieCredits(movieId).subscribe(credits => {
      expect(credits.cast.length).toBe(1);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/movie/${movieId}/credits?api_key=${environment.apiKey}&language=en-US`
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockCredits);
  });

  it('should fetch movie videos', () => {
    const movieId = 789;
    const mockVideos = { results: [{ key: 'abc123' }] };

    service.getMovieVideos(movieId).subscribe(videos => {
      expect(videos.results.length).toBe(1);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/movie/${movieId}/videos?api_key=${environment.apiKey}&language=en-US`
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockVideos);
  });

  it('should search movies by query', () => {
    const query = 'Matrix';
    const mockSearchResponse = {
      results: [{ id: 1, title: 'The Matrix' }],
    };

    service.searchMovies(query).subscribe(results => {
      expect(results.length).toBe(1);
      expect(results[0].title).toBe('The Matrix');
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/search/movie?api_key=${environment.apiKey}&query=Matrix`
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockSearchResponse);
  });
});