import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrbInventoryComponent } from './crb-inventory/crb-inventory.component';


const routes: Routes = [
  {path : 'crbinventory', component : CrbInventoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRBInventoryDashboardRoutingModule { }
