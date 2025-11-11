import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TmdbService } from '../services/tmdb.service';

export const movieDetailsResolver: ResolveFn<any> = (route) => {
  const tmdb = inject(TmdbService);
  const id = Number(route.paramMap.get('id'));

  return forkJoin({
    details: tmdb.getMovieDetails(id),
    credits: tmdb.getMovieCredits(id),
    videos: tmdb.getMovieVideos(id),
    recommendations: tmdb.getMovieRecommendations(id),
    reviews: tmdb.getMovieReviews(id),
  });
};