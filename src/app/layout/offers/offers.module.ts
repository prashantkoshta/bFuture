import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
//import {CdkTableModule} from '@angular/cdk';

import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';


import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';
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
        OffersRoutingModule,
        StatModule,
        MatTableModule,
        Ng2Charts
       // CdkTableModule
    ],
    declarations: [
        OffersComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent
    ]
})
export class OffersModule { }
