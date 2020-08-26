import { Component, OnInit } from '@angular/core';
import { CRBInventoryStaging } from 'src/app/modal/CRBInventoryStaging';
import { CrbInventoryService } from 'src/app/services/crb-inventory.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { checkServerIdentity } from 'tls';
//import { JwPaginationModule } from 'jw-angular-pagination';
// import { NgxPaginationModule } from 'ngx-pagination';

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
  selectApproval : CRBInventoryStaging[];
  checked : boolean;

  editSource: string;
  editDateOfItem: string;
  editEcooCompanyName: string;
  editisin: string;
  editCuspin: string;
  editsedol: string;
  editPrivateComapanyName: string;
  editNonPermisibleExpectedDate: string;
  editStageId : number;
  editRejection : string;

  modifiedBy : string = "System";

  config: any;
  totalRecords : string;
  page : number = 1;

  constructor( private crbService : CrbInventoryService,
     private modalService : NgbModal,
     private http : HttpClient,
     private fb : FormBuilder) {

      // this.config = {
      //   itemsPerPage: 5,
      //   currentPage: 1,
      //   totalItems: this.allstaging
      // };

      }

  ngOnInit(): void {

    this.crbService.getAllStaging().subscribe(response => { 
      this.allstaging = response;
    })
    this.checked = null;
    // for(var i=0;i<this.allstaging.length;i++)
    // console.log("check",this.allstaging[i]);
  }



  // pageChanged(event){
  //   this.config.currentPage = event;
  // }

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

  //add
  onSubmit(f: NgForm) {
    this.message=null;
    const url = 'http://localhost:8080/crb/add';
    this.http.post(url, f.value).subscribe((result) => {
        if(result){
        this.message="Record entered Successfuly!";
        this.ngOnInit(); 
        }
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  //details/view
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
 
selectFile(event) {
  this.selectedFiles = event.target.files;
}

upload() {
  this.message = null;
  if(confirm("Are you sure, you want to Upload this file ?")) {
  this.currentFileUpload = this.selectedFiles.item(0);
  this.crbService.uploadFile(this.currentFileUpload).subscribe((event) => {    
    if (event instanceof HttpResponse) {
      this.message = event.body.message;
      //alert(this.message);
    }
    this.ngOnInit();
  });
  this.selectedFiles = undefined;
  this.modalService.dismissAll();
}
}

//select checked
onSelect(){
  this.message = null;
  if(confirm("Are you sure, you want to submit the records for Approval?"))
  this.crbService.inApproval(this.selectApproval).subscribe(response => {
    //this.message = response.message;
     var message = "your record successfuly submited and in Inaproval state";
      this.message=message;
       this.ngOnInit();
  })
}

addApproval(stagingId:CRBInventoryStaging){
  if(!this.selectApproval) 
  this.selectApproval=[stagingId]
  else{
  if(this.selectApproval.find(element => element == stagingId))
  { console.log("Existed",this.selectApproval.findIndex(element => element == stagingId));
    this.selectApproval.splice(this.selectApproval.findIndex(element => element == stagingId),1) 
  }
  else      
  this.selectApproval.push(stagingId) ;    
  }
}

addApprovalAll(){
  if(this.checked==true){
  this.checked=false;
  this.selectApproval=null;
  }
  else{
  this.checked=true;
  this.selectApproval=this.allstaging.filter(element=> element.status=="InDraft");
  }
}

 openEdit(targetModal, staging: CRBInventoryStaging) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });
  this.editStageId = staging.stagingId;
  this.editSource=staging.source;
  this.editDateOfItem=staging.dateOfItem;
  this.editEcooCompanyName=staging.ecooCompanyName;
  this.editisin=staging.isin;
  this.editCuspin=staging.cuspin;
  this.editsedol=staging.sedol;
  this.editPrivateComapanyName=staging.privateComapanyName;
  this.editNonPermisibleExpectedDate=staging.nonPermisibleExpectedDate;
    
  }
  onUpdate(f: CRBInventoryStaging) {
    console.log(f);
    this.staging = {stagingId: this.editStageId,status:null, date:null, source: this.editSource,
                   dateOfItem: this.editDateOfItem,
                    ecooCompanyName: this.editEcooCompanyName,
                    isin: this.editisin, cuspin: this.editCuspin,
                    sedol: this.editsedol, privateComapanyName: this.editPrivateComapanyName,
                    nonPermisibleExpectedDate: this.editNonPermisibleExpectedDate,
                    rejectionNotes : this.editRejection};
    this.crbService.updateDetails(this.staging).subscribe(response =>{
      //this.message = response.message;
       var message= "Your Data has been updated Successfully";
      this.message=message
       this.ngOnInit();
    })
    this.modalService.dismissAll();

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
