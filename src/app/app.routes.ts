import { Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { movieDetailsResolver } from './core/resolvers/movie-details.resolver';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChangeDetectionComponent } from './pages/change-detection/change-detection.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { WebWorkersComponent } from './pages/web-workers/web-workers.component';

export const routes: Routes = environment.optimized
  ? [
      {
        path: '',
        loadComponent: () => import('./components/side-menu/side-menu.component').then(m => m.SideMenuComponent),
        children: [
          {
            path: 'dashboard',
            loadChildren: () =>
              import('./pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
          },
          {
            path: 'change-detection',
            loadChildren: () =>
              import('./pages/change-detection/change-detection.routes').then(m => m.CHANGE_DETECTION_ROUTES)            
          },
          {
            path: 'web-workers',
            loadChildren: () =>
              import('./pages/web-workers/web-workers.routes').then(m => m.WEB_WORKERS_ROUTES)
          },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      }
    ]
  : [
      {
        path: '',
        component: SideMenuComponent,
        children: [
          {
            path: 'dashboard',
            component: DashboardComponent
          },
          {
            path: 'change-detection',
            component: ChangeDetectionComponent
          },
          {
            path: 'change-detection/movie/:id',
            component: MovieDetailsComponent
          },
          {
            path: 'web-workers',
            component: WebWorkersComponent
          },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      }
    ];