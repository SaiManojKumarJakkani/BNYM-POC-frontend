import { Component, OnInit } from '@angular/core';
import { CRBInventoryStaging } from 'src/app/modal/CRBInventoryStaging';
import { CrbInventoryService } from 'src/app/services/crb-inventory.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-allstaging',
  templateUrl: './allstaging.component.html',
  styleUrls: ['./allstaging.component.css']
})
export class AllstagingComponent implements OnInit {

  allstaging : CRBInventoryStaging[];
  staging : CRBInventoryStaging;
  closeResult : string;
  editForm : FormGroup;
  selectedFiles: FileList;
  currentFileUpload: File;
  message : string;

  constructor( private crbService : CrbInventoryService,
     private modalService : NgbModal,
     private http : HttpClient,
     private fb : FormBuilder) { }

  ngOnInit(): void {

    this.crbService.getAllStaging().subscribe(response => { 
      this.allstaging = response;});
    // this.editForm =  this.fb.group({
    //   satgingId: [''],
    //   source: [''],
    //   dateOfItem: [''],
    //   ecooCompanyName: [''],
    //   isin: [''],
    //   cuspin: [''],
    //   sedol: [''],
    //   privateComapanyName: [''],
    //   nonPermisibleExpectedDate: ['']
      
    //  });
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

  onSubmit(f: NgForm) {
    const url = 'http://localhost:8080/crb/add';
    this.http.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  openDetails(targetModal, staging: CRBInventoryStaging) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('src').setAttribute('value', staging.source);
    document.getElementById('dot').setAttribute('value', staging.dateOfItem);
    document.getElementById('ecn').setAttribute('value', staging.ecooCompanyName);
    document.getElementById('isi').setAttribute('value', staging.isin);
    document.getElementById('cus').setAttribute('value', staging.cuspin);
    document.getElementById('sed').setAttribute('value', staging.sedol);
    document.getElementById('pcn').setAttribute('value', staging.privateComapanyName);
    document.getElementById('nped').setAttribute('value', staging.nonPermisibleExpectedDate);
 }

//  openEdit(targetModal, staging: CRBInventoryStaging) {
//   this.modalService.open(targetModal, {
//    centered: true,
//    backdrop: 'static',
//    size: 'lg'
//  });
//  this.editForm.patchValue( {
//   id: staging.stagingId, 
//   source: staging.source,
//   dateOfItem: staging.dateOfItem,
//   ecooCompanyName: staging.ecooCompanyName,
//   isin: staging.isin,
//   cuspin: staging.cuspin,
//   sedol: staging.sedol,
//   privateComapanyName: staging.privateComapanyName,
//   nonPermisibleExpectedDate: staging.nonPermisibleExpectedDate,
// });

// }
 
selectFile(event) {
  this.selectedFiles = event.target.files;
}

upload() {
  if(confirm("Are you sure, you want to Upload this file ?")) {
  this.currentFileUpload = this.selectedFiles.item(0);
  this.crbService.uploadFile(this.currentFileUpload).subscribe((event) => {
    console.log("check",event);
    
    if (event instanceof HttpResponse) {
      this.message = event.body.message;
      alert(this.message);
    }
    this.ngOnInit();
  });
  this.selectedFiles = undefined;
}
}

onSubmit2(f: NgForm) {
  const url = 'http://localhost:8080/crb/stagingId';
  this.http.post(url, f.value)
    .subscribe((result) => {
      this.ngOnInit(); //reload the table
    });
  this.modalService.dismissAll(); //dismiss the modal
}

}
