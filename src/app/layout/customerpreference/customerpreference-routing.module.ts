import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerPreferenceComponent } from './customerpreference.component';

// const routes: Routes = [
//     { path: '', component: ChartsComponent }
// ];
const routes:Routes = [
    {
        path:':id',
        component :CustomerPreferenceComponent
    },
    {
        path:'',
        component :CustomerPreferenceComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerPreferenceRoutingModule { }
