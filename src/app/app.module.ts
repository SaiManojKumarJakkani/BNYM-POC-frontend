import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationNormalizationModule } from './location-normalization/location-normalization.module';
import { CrbInventoryModule } from './crb-inventory/crb-inventory.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { JwPaginationModule } from 'jw-angular-pagination';
 import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LocationNormalizationModule,
    CrbInventoryModule,
    NgbModule,
    ReactiveFormsModule,
    //JwPaginationModule
     NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
