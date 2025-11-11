import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { RenderTracker } from '../../core/utils/render-tracker.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule, CardModule],
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