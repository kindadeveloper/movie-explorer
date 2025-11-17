import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PerformanceService } from './core/services/performance.service';
import { RenderTracker } from './core/utils/render-tracker.directive';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent extends RenderTracker implements OnInit, AfterViewInit {
  private router = inject(Router);

  ngOnInit() {
    if (this.router.url === '/' || this.router.url === '') {
      this.router.navigate(['/change-detection']);
    }
  }

  ngAfterViewInit() {
    this.perf.markFirstRender();
  }
}