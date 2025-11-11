import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PerformanceService } from './core/services/performance.service';
import { RenderTracker } from './core/utils/render-tracker.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [RouterOutlet]
})
export class AppComponent extends RenderTracker implements AfterViewInit {

  ngAfterViewInit() {
    this.perf.markFirstRender();
  }
}