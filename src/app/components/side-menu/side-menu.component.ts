import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PerformanceService } from '../../core/services/performance.service';
import { TagModule } from 'primeng/tag';
import { RenderTracker } from '../../core/utils/render-tracker.directive';
import { CdCounterComponent } from '../cd-counter/cd-counter.component';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, TagModule, CdCounterComponent],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent extends RenderTracker {}