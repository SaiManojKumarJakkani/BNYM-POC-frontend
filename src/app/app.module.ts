import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CRBInventoryDashboardModule } from './crbinventory-dashboard/crbinventory-dashboard.module';
import { LocationDashboardModule } from './location-dashboard/location-dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CRBInventoryDashboardModule,
    LocationDashboardModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
