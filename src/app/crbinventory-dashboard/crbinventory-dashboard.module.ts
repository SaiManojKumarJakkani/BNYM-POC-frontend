import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CRBInventoryDashboardRoutingModule } from './crbinventory-dashboard-routing.module';
import { CrbInventoryComponent } from './crb-inventory/crb-inventory.component';


@NgModule({
  declarations: [CrbInventoryComponent],
  imports: [
    CommonModule,
    CRBInventoryDashboardRoutingModule
  ],
  exports: [
    CrbInventoryComponent
  ]
})
export class CRBInventoryDashboardModule { }
