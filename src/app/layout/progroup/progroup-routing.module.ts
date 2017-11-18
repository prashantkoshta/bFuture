import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProGroupComponent } from './progroup.component';

const routes: Routes = [
    { path: '', component: ProGroupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProGroupRoutingModule { }
