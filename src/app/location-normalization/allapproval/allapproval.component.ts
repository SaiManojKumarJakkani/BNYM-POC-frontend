import { Component, OnInit } from '@angular/core';
import { LocationStaging } from 'src/app/LocationStaging';
import { LocationNormalization } from 'src/app/LocationNormalization.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-allapproval',
  templateUrl: './allapproval.component.html',
  styleUrls: ['./allapproval.component.css']
})
export class AllapprovalComponent implements OnInit {
  allapproval:LocationStaging[];
  rejectLocation:string;
  rejectNormalized:string;
  rejectNotes:string;
  rejectId:number;
  loc:LocationStaging;




  constructor(private locationNormalization:LocationNormalization,private modalService : NgbModal,private fb : FormBuilder) { }

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
  openDetails(targetModal, stagin: LocationStaging) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.rejectId=stagin.id;
   this.rejectLocation=stagin.locationName;
   this.rejectNormalized=stagin.normalizedLocation;
   this.rejectNotes=stagin.rejectionNotes;
 }
 onReject(f:LocationStaging){
  console.log(f);
  this.loc={id:this.rejectId,status:null,modifiedDate:null, locationName: this.rejectLocation ,normalizedLocation: this.rejectNormalized, rejectionNotes:this.rejectNotes};
  this.locationNormalization.approvereject(this.loc,"reject").subscribe(resp=>{
    if(resp){
    alert(resp.message);
    this.ngOnInit();
    }
  })
  this.modalService.dismissAll(); //dismiss the modal
}

}
