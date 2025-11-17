import { Routes } from '@angular/router';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

export const routes: Routes = [
      {
        path: '',
        component: SideMenuComponent,
        children: [
          {
            path: 'dashboard',
            loadChildren: () =>
              import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
          },
          {
            path: 'change-detection',
            loadChildren: () =>
              import('./pages/change-detection/change-detection.module').then(m => m.ChangeDetectionModule)
          },
          {
            path: 'web-workers',
            loadChildren: () =>
              import('./pages/web-workers/web-workers.module').then(m => m.WebWorkersModule)
          },
          { path: '', redirectTo: 'change-detection', pathMatch: 'full' }
        ]
      }
    ];