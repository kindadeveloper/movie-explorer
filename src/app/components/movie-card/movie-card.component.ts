import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { RenderTracker } from '../../core/utils/render-tracker.directive';

@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  changeDetection: environment.optimized ? ChangeDetectionStrategy.OnPush : ChangeDetectionStrategy.Default
})
export class MovieCardComponent extends RenderTracker {
  private router = inject(Router);
  @Input() movie: any;
  @Input() optimized = false;

  navigateToDetails() {
    this.router.navigate(['/change-detection/movie', this.movie.id]);
  }
}