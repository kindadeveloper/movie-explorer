import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { routes } from './app.routes';
import { cacheInterceptor } from './core/interceptors/cache-interceptor';
import { AppComponent } from './app';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CdCounterComponent } from './components/cd-counter/cd-counter.component';
import { environment } from '../environments/environment';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { ChangeDetectionModule } from './pages/change-detection/change-detection.module';
import { WebWorkersModule } from './pages/web-workers/web-workers.module';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent
],
  imports: [
    RouterOutlet,
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    CommonModule,
    ButtonModule,
    TagModule,
    CdCounterComponent,
    ...(environment.optimized ? [] : [
        DashboardModule,
        ChangeDetectionModule,
        WebWorkersModule
    ])
  ],
  providers: [
    provideHttpClient(withInterceptors([cacheInterceptor])),
    providePrimeNG({
      theme: {
        preset: Aura
      },
    }),
    provideAnimationsAsync(),
],
  bootstrap: [AppComponent]
})
export class AppModule {}