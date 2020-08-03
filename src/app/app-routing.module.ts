import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path : 'crbinventory', loadChildren : './crbinventory-dashboard/crbinventory-dashboard.module#CrbInventoryDashboardModule'},
  {path : 'location', loadChildren : './location-dashboard/location-dashboard.module#LoactionDashboardModule'},
  {path : '', redirectTo : '/crbinventory', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
