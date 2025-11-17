import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { TmdbService } from '../../core/services/tmdb.service';
import { forkJoin } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { RenderTracker } from '../../core/utils/render-tracker.directive';

@Component({
  selector: 'app-movie-details',
  standalone: false,
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  changeDetection: environment.optimized ? ChangeDetectionStrategy.OnPush : ChangeDetectionStrategy.Default,
})
export class MovieDetailsComponent extends RenderTracker implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tmdbService = inject(TmdbService);
  private cdr = inject(ChangeDetectorRef);
  private sanitizer = inject(DomSanitizer);
  optimized = environment.optimized;

  data: any = null;

  ngOnInit() {
    if (this.optimized) {
      this.data = this.route.snapshot.data['movie'];
      this.sanitizeVideoUrls();
    } else {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      forkJoin({
        details: this.tmdbService.getMovieDetails(id),
        credits: this.tmdbService.getMovieCredits(id),
        videos: this.tmdbService.getMovieVideos(id),
        recommendations: this.tmdbService.getMovieRecommendations(id),
        reviews: this.tmdbService.getMovieReviews(id),
      }).subscribe(res => {
        this.data = res;
        this.sanitizeVideoUrls();
        this.cdr.detectChanges();
      });
    }
  }

  private sanitizeVideoUrls() {
    if (this.data?.videos?.results) {
      this.data.videos.results = this.data.videos.results.map((video: any) => ({
        ...video,
        safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${video.key}`
        ),
      }));
    }
  }

  goBack() {
    this.router.navigate(['/change-detection']);
  }
}