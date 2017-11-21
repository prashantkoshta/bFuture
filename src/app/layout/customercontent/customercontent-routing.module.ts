import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerContentComponent } from './customercontent.component';

// const routes: Routes = [
//     { path: '', component: ChartsComponent }
// ];
const routes:Routes = [
    
    { 
        path: ':id',
        component :CustomerContentComponent
    },
    { 
        path: '**',
        component :CustomerContentComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerContentRoutingModule { }
