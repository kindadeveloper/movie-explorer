import { Routes } from '@angular/router';
import { movieDetailsResolver } from '../../core/resolvers/movie-details.resolver';

export const WEB_WORKERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./web-workers.component').then(m => m.WebWorkersComponent),
  }
];