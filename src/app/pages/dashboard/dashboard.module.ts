import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: DashboardComponent }]),
        ChartModule,
        CardModule
    ],
})
export class DashboardModule {}