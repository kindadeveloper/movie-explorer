import { Routes } from '@angular/router';
import { movieDetailsResolver } from '../../core/resolvers/movie-details.resolver';

export const CHANGE_DETECTION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./change-detection.component').then(m => m.ChangeDetectionComponent),
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('../movie-details/movie-details.component').then(
        m => m.MovieDetailsComponent
      ),
    resolve: { movie: movieDetailsResolver },
  }
];