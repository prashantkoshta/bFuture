import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'merchant', loadChildren: './merchant/merchant.module#MerchantModule' },
            { path: 'customer', loadChildren: './customer/customer.module#CustomerModule' },
            { path: 'customer-collaboration', loadChildren: './customerpreference/customerpreference.module#CustomerPreferenceModule' },
            { path: 'customer-content', loadChildren: './customercontent/customercontent.module#CustomerContentModule' },
            { path: 'customergroup', loadChildren: './scatterchart/scatterchart.module#ScatterChartModule' },
            { path: 'offers', loadChildren: './offers/offers.module#OffersModule' },
            // { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            // { path: 'forms', loadChildren: './form/form.module#FormModule' },
            // { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            // { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            // { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
