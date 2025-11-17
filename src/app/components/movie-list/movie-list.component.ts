import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { environment } from '../../../environments/environment';
import { RenderTracker } from '../../core/utils/render-tracker.directive';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: environment.optimized ? ChangeDetectionStrategy.OnPush : ChangeDetectionStrategy.Default
})
export class MovieListComponent extends RenderTracker {
  @Input() movies: any[] | null = null;
  @Input() optimized = false;

  trackMovie = (index: number, movie: any) =>
    this.optimized ? movie.id : index;
}