import { NgModule } from '@angular/core';
import { WebWorkersComponent } from './web-workers.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [WebWorkersComponent],
    imports: [
        RouterModule.forChild([{ path: '', component: WebWorkersComponent }]),
        CommonModule,
        ButtonModule,
        ProgressSpinnerModule,
        MessageModule,
        CardModule,
        SelectModule,
        ReactiveFormsModule
    ],
})
export class WebWorkersModule {}