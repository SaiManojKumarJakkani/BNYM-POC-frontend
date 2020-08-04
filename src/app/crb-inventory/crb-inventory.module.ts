import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllapprovalComponent } from './allapproval/allapproval.component';
import { HomeComponent } from './home/home.component';
import { AllstagingComponent } from './allstaging/allstaging.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path:'crbinventory',component:  HomeComponent,
          children:[
          {path:'', component: AllstagingComponent},
          {path:'allstaging', component: AllstagingComponent},
          {path:'allapproval', component: AllapprovalComponent}
        ]
}

];

@NgModule({
  declarations: [AllapprovalComponent, HomeComponent, AllstagingComponent],
  imports: [
    CommonModule,
    FormsModule,RouterModule.forRoot(routes)
  ]
})
export class CrbInventoryModule { }
