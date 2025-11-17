import { NgModule } from '@angular/core';
import { ChangeDetectionComponent } from './change-detection.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { movieDetailsResolver } from '../../core/resolvers/movie-details.resolver';

@NgModule({
    declarations: [
        ChangeDetectionComponent,
        MovieListComponent,
        MovieCardComponent,
        MovieDetailsComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: '', component: ChangeDetectionComponent },
            { path: 'movie/:id', component: MovieDetailsComponent, resolve: {movie: movieDetailsResolver} }
        ]),
        CommonModule,
        ButtonModule,
        SelectModule,
        InputTextModule,
        CardModule,
        DividerModule,
        TagModule
    ],
})
export class ChangeDetectionModule {}