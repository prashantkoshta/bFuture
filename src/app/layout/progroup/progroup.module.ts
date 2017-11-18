import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material';
//import {CdkTableModule} from '@angular/cdk';

import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';


import { ProGroupRoutingModule } from './progroup-routing.module';
import { ProGroupComponent } from './progroup.component';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';
import { StatModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        ProGroupRoutingModule,
        StatModule,
        MatTableModule
       // CdkTableModule
    ],
    declarations: [
        ProGroupComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent
    ]
})
export class ProGroupModule { }
