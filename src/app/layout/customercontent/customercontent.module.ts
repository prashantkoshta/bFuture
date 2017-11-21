import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { CustomerContentRoutingModule } from './customercontent-routing.module';
import { CustomerContentComponent } from './customercontent.component';
import { PageHeaderModule } from '../../shared';


@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        CustomerContentRoutingModule,
        PageHeaderModule
    ],
    declarations: [CustomerContentComponent]
})
export class CustomerContentModule { }
