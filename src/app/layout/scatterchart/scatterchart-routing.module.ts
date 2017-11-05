import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScatterChartComponent } from './scatterchart.component';

const routes: Routes = [
    { path: '', component: ScatterChartComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChartsRoutingModule { }
