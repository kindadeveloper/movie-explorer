import { Routes } from "@angular/router";
import { SideMenuComponent } from "./components/side-menu/side-menu.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ChangeDetectionComponent } from "./pages/change-detection/change-detection.component";
import { MovieDetailsComponent } from "./pages/movie-details/movie-details.component";
import { WebWorkersComponent } from "./pages/web-workers/web-workers.component";

export const routes: Routes = [
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
          { path: '', redirectTo: 'change-detection', pathMatch: 'full' }
        ]
      }
    ];