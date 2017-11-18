import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { CustomerPreferenceRoutingModule } from './customerpreference-routing.module';
import { CustomerPreferenceComponent } from './customerpreference.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        CustomerPreferenceRoutingModule,
        PageHeaderModule
    ],
    declarations: [CustomerPreferenceComponent]
})
export class CustomerPreferenceModule { }
