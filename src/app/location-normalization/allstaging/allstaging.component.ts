import { Component, OnInit } from '@angular/core';
import { LocationStaging } from 'src/app/LocationStaging';
import { LocationNormalization } from 'src/app/LocationNormalization.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { HttpResponse, HttpHeaderResponse } from '@angular/common/http';
import { element } from 'protractor';
import  {PaginationControlsComponent}           from 'ngx-pagination';


@Component({
  selector: 'app-allstaging',
  templateUrl: './allstaging.component.html',
  styleUrls: ['./allstaging.component.css']
})
export class AllstagingComponent implements OnInit {
allstaging:LocationStaging[];
selectedFiles: FileList;
currentFileUpload: File;
message:string;
closeResult : string;
selectApproval:LocationStaging[];
checked:boolean;
editLocation:string;
editNormalized:string;
editRejection:string;
loc:LocationStaging;


  constructor(private locationNormalization:LocationNormalization,private modalService : NgbModal,private fb : FormBuilder) { 

  }

  ngOnInit(){
    this.locationNormalization.getAllStaging().subscribe(resp=>{
      this.allstaging=resp;
    })
    this.checked=null;
  }
  open(content) {
    this.message=null;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  openDetails(targetModal, stagin: LocationStaging) {
    this.message=null;
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.editLocation=stagin.locationName;
   this.editNormalized=stagin.normalizedLocation;
   this.editRejection=stagin.rejectionNotes;
  //  this.editStaging.locationName =staging.locationName;
  //  this.editStaging.normalizedLocation =staging.normalizedLocation;
  //  this.editStaging.id=staging.id
 }
  onSubmit(f: LocationStaging) {
    this.message=null;
    this.locationNormalization.saveDetails(f).subscribe(resp=>{
      this.message=resp.message;
      this.ngOnInit();   
    })
    this.modalService.dismissAll(); //dismiss the modal
  }
  onEdit(f:LocationStaging){
    this.message=null;
    console.log(f);
    this.loc={id:0,status:null,modifiedDate:null, locationName: this.editLocation,normalizedLocation: this.editNormalized, rejectionNotes:this.editRejection};
    this.locationNormalization.updateDetails(this.loc).subscribe(resp=>{
      this.message=resp.message;
      this.ngOnInit();   
    })
    this.modalService.dismissAll(); //dismiss the modal
  }
  onSelect() {
    this.message=null;
    if(confirm("Are you sure, you want to submit the records for Approval?"))
    this.locationNormalization.toInApproval(this.selectApproval).subscribe(resp=>{
      this.message=resp.message;
      this.ngOnInit();
    })
  }
  addApproval(id:LocationStaging){

    this.message=null;
    if(!this.selectApproval) 
    this.selectApproval=[id]
    else{
    if(this.selectApproval.find(element => element == id))
    { console.log("Existed",this.selectApproval.findIndex(element => element == id));
      this.selectApproval.splice(this.selectApproval.findIndex(element => element == id),1) 
    }
    else      
    this.selectApproval.push(id) ;    
    }
  }
  addApprovalAll(){
    this.message=null;
    if(this.checked==true){
    this.checked=false;
    this.selectApproval=null;
    }
    else{
    this.checked=true;
    this.selectApproval=this.allstaging.filter(element=> element.status=="IN_DRAFT");
    }
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  upload() {
    this.message=null;
    if(confirm("Are you sure, you want to Upload this file ?")) {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.locationNormalization.uploadFile(this.currentFileUpload).subscribe((event) => {      
      if (event instanceof HttpResponse) {
        this.message = event.body.message;
      }
      this.ngOnInit();
    });
    this.selectedFiles = undefined;
    this.modalService.dismissAll(); //dismiss the modal
  }
}

openUpload(targetModal) {
  this.message=null;
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });
}
}
