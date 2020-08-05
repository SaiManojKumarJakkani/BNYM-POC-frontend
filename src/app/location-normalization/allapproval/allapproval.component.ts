import { Component, OnInit } from '@angular/core';
import { LocationStaging } from 'src/app/LocationStaging';
import { LocationNormalization } from 'src/app/LocationNormalization.service';

@Component({
  selector: 'app-allapproval',
  templateUrl: './allapproval.component.html',
  styleUrls: ['./allapproval.component.css']
})
export class AllapprovalComponent implements OnInit {
  allapproval:LocationStaging[];

  constructor(private locationNormalization:LocationNormalization) { }

  ngOnInit(): void {
    this.locationNormalization.getAllApproval().subscribe(resp=>{
      this.allapproval=resp;
    })
  }
  approvereject(l:LocationStaging,a:string){
    if(confirm("Are you sure you want to "+a+"?"))
    this.locationNormalization.approvereject(l,a).subscribe(resp=>{
      if(resp){
      alert(resp.message);
      this.ngOnInit();
      }
    })



  }

}
