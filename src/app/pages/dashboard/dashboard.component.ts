import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RenderTracker } from '../../core/utils/render-tracker.directive';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent extends RenderTracker {
    chartData = {
      labels: ['Change Detection', 'Resolvers', 'Web Workers', 'Cache'],
      datasets: [
        {
          label: 'Optimization Impact (relative)',
          data: [80, 60, 70, 50],
        },
      ],
    };

    chartOptions = {
      maintainAspectRatio: false,
    };
}