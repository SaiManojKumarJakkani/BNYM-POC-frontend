import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AllstagingComponent } from './allstaging/allstaging.component';
import { AllapprovalComponent } from './allapproval/allapproval.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path:'LocationNormalization',component:HomeComponent,
          children:[
          {path:'',component:AllstagingComponent},
          {path:'allstaging',component:AllstagingComponent},
          {path:'allapproval',component:AllapprovalComponent}
        ]
}

];


@NgModule({
  declarations: [AllstagingComponent, AllapprovalComponent, HomeComponent],
  imports: [
    CommonModule,FormsModule,RouterModule.forRoot(routes)
  ]
})
export class LocationNormalizationModule { }
