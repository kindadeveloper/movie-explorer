import { Component } from '@angular/core';
import { RenderTracker } from '../../core/utils/render-tracker.directive';

@Component({
  selector: 'app-side-menu',
  standalone: false,
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent extends RenderTracker {}