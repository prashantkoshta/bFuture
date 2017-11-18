import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material';
//import {CdkTableModule} from '@angular/cdk';

import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';


import { MerchantRoutingModule } from './merchant-routing.module';
import { MerchantComponent } from './merchant.component';
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
        MerchantRoutingModule,
        StatModule,
        MatTableModule
       // CdkTableModule
    ],
    declarations: [
        MerchantComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent
    ]
})
export class MerchantModule { }
