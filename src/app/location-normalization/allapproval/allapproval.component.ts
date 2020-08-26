import { Component, OnInit } from '@angular/core';
import { LocationStaging } from 'src/app/modal/LocationStaging';
import { LocationNormalization } from 'src/app/services/LocationNormalization.service';
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
  selectRecord:LocationStaging[];
  checked:boolean;
  rejectNotesAll:string;
  message:string;
  constructor(private locationNormalization:LocationNormalization,private modalService : NgbModal,private fb : FormBuilder) { }

  ngOnInit(): void {
    this.locationNormalization.getAllApproval().subscribe(resp=>{
      this.allapproval=resp;
    })
    this.checked=null;
  }
  approvereject(l:LocationStaging,a:string){
    this.message=null;

    if(confirm("Are you sure you want to "+a+"?"))
    this.locationNormalization.approvereject(l,a).subscribe(resp=>{
      if(resp){
        this.message=resp.message;
        this.ngOnInit();
      }
    })
  }
  openDetails(targetModal, stagin: LocationStaging) {
    this.message=null;
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
  this.message=null;

  console.log(f);
  this.loc={id:this.rejectId,status:null,modifiedDate:null, locationName: this.rejectLocation ,normalizedLocation: this.rejectNormalized, rejectionNotes:this.rejectNotes};
  this.locationNormalization.approvereject(this.loc,"reject").subscribe(resp=>{
    if(resp){
      this.message=resp.message;
    this.ngOnInit();
    }
  })
  this.modalService.dismissAll(); //dismiss the modal
}
openDetailsAll(targetModal) {
  this.message=null;
  if(this.selectRecord!=null && this.selectRecord.length!=0){
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });
}
}
checkedAR(id:LocationStaging){
  this.message=null;
  

  if(!this.selectRecord) 
  this.selectRecord=[id]
  else{
  if(this.selectRecord.find(element => element == id))
  { console.log("Existed",this.selectRecord.findIndex(element => element == id));
    this.selectRecord.splice(this.selectRecord.findIndex(element => element == id),1) 
  }
  else      
  this.selectRecord.push(id) ;    
  }
}
checkedARAll(){
  this.message=null;

  if(this.checked==true){
  this.checked=false;
  this.selectRecord=null;
  }
  else{
  this.checked=true;
  this.selectRecord=this.allapproval;
  }
}
onSelect(s:string) {
  this.message=null;
  if(this.selectRecord!=null && this.selectRecord.length!=0){
  if(confirm("Are you sure, you want to "+s+"?")){
    for (var i = 0; i < this.selectRecord.length; i++) {
      this.selectRecord[i].rejectionNotes = this.rejectNotesAll;
      }  
    this.locationNormalization.approverejectAll(this.selectRecord,s).subscribe(resp=>{
      this.message=resp.message;
    this.ngOnInit();
    this.modalService.dismissAll(); //dismiss the modal
  })
}
}
}
}
