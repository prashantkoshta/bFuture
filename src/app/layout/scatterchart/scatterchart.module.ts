import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { ChartsRoutingModule } from './scatterchart-routing.module';
import { ScatterChartComponent } from './scatterchart.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        ChartsRoutingModule,
        PageHeaderModule
    ],
    declarations: [ScatterChartComponent]
})
export class ScatterChartModule { }
