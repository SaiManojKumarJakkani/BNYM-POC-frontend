import { Component, OnInit } from '@angular/core';
import { LocationStaging } from 'src/app/LocationStaging';
import { LocationNormalization } from 'src/app/LocationNormalization.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { HttpResponse, HttpHeaderResponse } from '@angular/common/http';
import { element } from 'protractor';


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

  constructor(private locationNormalization:LocationNormalization,private modalService : NgbModal,private fb : FormBuilder) { }

  ngOnInit(){
    this.locationNormalization.getAllStaging().subscribe(resp=>{
      this.allstaging=resp;
    })
    this.checked=null;
  }
  open(content) {
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
  onSubmit(f: LocationStaging) {
    this.locationNormalization.saveDetails(f).subscribe(resp=>{
      alert(resp.message);
      this.ngOnInit();   
    })
    this.modalService.dismissAll(); //dismiss the modal
  }
  onSelect() {
    this.locationNormalization.toInApproval(this.selectApproval).subscribe(resp=>{
      alert(resp.message);
      this.ngOnInit();
    })
  }
  addApproval(id:LocationStaging){
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
    if(confirm("Are you sure, you want to Upload this file ?")) {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.locationNormalization.uploadFile(this.currentFileUpload).subscribe((event) => {      
      if (event instanceof HttpResponse) {
        this.message = event.body.message;
        alert(this.message);
      }
      this.ngOnInit();
    });
    this.selectedFiles = undefined;
  }
}
}
