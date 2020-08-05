import { Component, OnInit } from '@angular/core';
import { LocationStaging } from 'src/app/LocationStaging';
import { LocationNormalization } from 'src/app/LocationNormalization.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { HttpResponse, HttpHeaderResponse } from '@angular/common/http';


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

  constructor(private locationNormalization:LocationNormalization,private modalService : NgbModal,private fb : FormBuilder) { }

  ngOnInit(){
    this.locationNormalization.getAllStaging().subscribe(resp=>{
      this.allstaging=resp;
    })
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
      alert(resp.message)
      this.ngOnInit();
      
    })
    this.modalService.dismissAll(); //dismiss the modal
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
