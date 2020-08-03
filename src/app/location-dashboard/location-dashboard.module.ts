import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationDashboardRoutingModule } from './location-dashboard-routing.module';
import { LocationComponent } from './location/location.component';


@NgModule({
  declarations: [LocationComponent],
  imports: [
    CommonModule,
    LocationDashboardRoutingModule
  ]
})
export class LocationDashboardModule { }
