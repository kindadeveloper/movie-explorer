import { Component, ChangeDetectionStrategy, OnDestroy, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { debounceTime, Observable, shareReplay, Subject } from 'rxjs';
import { TmdbService } from '../../core/services/tmdb.service';

@Component({
  selector: 'app-change-detection',
  standalone: false,
  templateUrl: './change-detection.component.html',
  styleUrls: ['./change-detection.component.scss'],
  changeDetection: environment.optimized ? ChangeDetectionStrategy.OnPush : ChangeDetectionStrategy.Default
})
export class ChangeDetectionComponent implements OnInit, OnDestroy {
  private tmdbService = inject(TmdbService);
  private cdr = inject(ChangeDetectorRef);
  optimized = environment.optimized;
  counter = 0;

  movies$?: Observable<any[]>;
  movies: any[] = [];

  search$ = new Subject<string>();

  constructor() {
    this.onLimitChange();
  }

  ngOnInit() {
    this.search$.pipe(debounceTime(400)).subscribe(searchValue => {
      console.log('Searching for:', searchValue);
      this.movies$ = this.tmdbService.searchMovies(searchValue);
      this.cdr.detectChanges();
    });
  }

  increment() {
    this.counter++;
  }

  onLimitChange(limit: number = 20) {
    if (this.optimized) {
      this.movies$ = this.tmdbService.getPopularMovies(limit).pipe(shareReplay(1));
    } else {
      this.tmdbService.getPopularMovies(limit).subscribe({
        next: res => {
          this.movies = res;
          this.cdr.detectChanges();
        },
      });
    }
  }

  onSearchChange(searchValue: string) {
    if (this.optimized) {
      this.search$.next(searchValue);
    } else {
      this.tmdbService.searchMovies(searchValue).subscribe({
        next: res => {
          this.movies = res;
          this.cdr.detectChanges();
        },
      });
    }
  }

  ngOnDestroy() {
    if (this.optimized) {
      this.search$.complete();
      this.search$.unsubscribe();
    }
  }
}