import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getPopularMovies(limit: number = 20) {
    const moviesPerPage = 20;
    const pages = Math.ceil(limit / moviesPerPage);

    const requests = Array.from({ length: pages }, (_, i) =>
      this.http.get<any>(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}&page=${i + 1}`)
    );

    return forkJoin(requests).pipe(
      map(responses => responses.flatMap(r => r.results).slice(0, limit))
    );
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=en-US`);
  }

  getMovieCredits(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}/credits?api_key=${this.apiKey}&language=en-US`);
  }

  getMovieVideos(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}/videos?api_key=${this.apiKey}&language=en-US`);
  }

  getMovieRecommendations(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}/recommendations?api_key=${this.apiKey}&language=en-US`);
  }

  getMovieReviews(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}/reviews?api_key=${this.apiKey}&language=en-US`);
  }

  searchMovies(query: string): Observable<any[]> {
    return this.http.get(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}`).pipe(
      map((response: any) => response.results)
    );
  }
}
