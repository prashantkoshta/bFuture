import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material';
//import {CdkTableModule} from '@angular/cdk';

import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';


import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
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
        CustomerRoutingModule,
        StatModule,
        MatTableModule
       // CdkTableModule
    ],
    declarations: [
        CustomerComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent
    ]
})
export class CustomerModule { }
