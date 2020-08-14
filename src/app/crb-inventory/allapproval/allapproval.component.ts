import { Component, OnInit } from '@angular/core';
import { CRBInventoryStaging } from 'src/app/modal/CRBInventoryStaging';
import { CrbInventoryService } from 'src/app/services/crb-inventory.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { createSecretKey } from 'crypto';

@Component({
  selector: 'app-allapproval',
  templateUrl: './allapproval.component.html',
  styleUrls: ['./allapproval.component.css']
})
export class AllapprovalComponent implements OnInit {

  allapproval : CRBInventoryStaging[];
  staging : CRBInventoryStaging;

  closeResult: string;
  message :string;
  selectRecords: CRBInventoryStaging[];
  checked : boolean;

  rejectSource : string;
  rejectDateOfItem: string;
  rejectEcooCompanyName: string;
  rejectisin: string;
  rejectCuspin: string;
  rejectsedol: string;
  rejectPrivateComapanyName: string;
  rejectNonPermisibleExpectedDate: string;
  rejectStageId : number;
  rejectNotes : string;
  rejectNotesAll : string;

  constructor(private crbService : CrbInventoryService,
    private modalService : NgbModal,
    private httpclient : HttpClient) { }

  ngOnInit(): void {
      this.crbService.getAllAprovals().subscribe(response => {
        this.allapproval = response;
      })
  }
  openReject(content) {
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
    const url = 'http://localhost:8080/crb/stagingId/status';
    this.httpclient.get(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  approveOrReject(crb : CRBInventoryStaging, a : string){
    if(confirm("Are you sure you want to "+a+"?"))
    this.crbService.approveOrReject(crb,a).subscribe(resp=>{
      if(resp){
      var response = JSON.parse(JSON.stringify(resp));
      if(response.status == "approved"){
        alert("Approved Successfully !!!");
      }else{
        alert("Rejected!!!");
      } 
      this.ngOnInit();
      }
    })
  }
  openDetails(targetModal, staging: CRBInventoryStaging) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.rejectStageId = staging.stagingId;
   this.rejectSource=staging.source;
   this.rejectDateOfItem=staging.dateOfItem;
   this.rejectEcooCompanyName=staging.ecooCompanyName;
   this.rejectisin=staging.isin;
   this.rejectCuspin=staging.cuspin;
   this.rejectsedol=staging.sedol;
   this.rejectPrivateComapanyName=staging.privateComapanyName;
   this.rejectNonPermisibleExpectedDate=staging.nonPermisibleExpectedDate;
   this.rejectNotes=staging.rejectionNotes;
     
   }
  
  onReject(f:CRBInventoryStaging){
    console.log(f);
    this.staging={stagingId : this.rejectStageId, status: null, date :null, source: this.rejectSource,
                  dateOfItem: this.rejectDateOfItem,
                  ecooCompanyName: this.rejectEcooCompanyName,
                  isin: this.rejectisin, cuspin: this.rejectCuspin,
                  sedol: this.rejectsedol, privateComapanyName: this.rejectPrivateComapanyName,
                  nonPermisibleExpectedDate: this.rejectNonPermisibleExpectedDate,
                  rejectionNotes : this.rejectNotes};
                  this.crbService.approveOrReject(this.staging,"reject").subscribe(resp=>{
                if(resp){
                  var message= "Rejected";
                  alert(message);
                this.ngOnInit();
                }
              })
              this.modalService.dismissAll(); //dismiss the modal
            }

openDetailsAll(targetModal) {
  this.message=null;
          
  this.modalService.open(targetModal, {
  centered: true,
  backdrop: 'static',
  size: 'lg'
  });
}

  checkedAPAll(){
    this.message = null;
    if(this.checked == true){
      this.checked = false;
      this.selectRecords = null;
    }
    else{
      this.checked = true;
      this.selectRecords = this.allapproval;
    }
  }

  checkedAP(stagingId : CRBInventoryStaging){
    this.message = null;

    if(!this.selectRecords) 
    this.selectRecords=[stagingId]
    else{
    if(this.selectRecords.find(element => element == stagingId))
    { console.log("Existed",this.selectRecords.findIndex(element => element == stagingId));
    this.selectRecords.splice(this.selectRecords.findIndex(element => element == stagingId),1) 
    }
    else      
    this.selectRecords.push(stagingId) ;    
    }
  }

  onSelect(s: string){
    this.message = null;
    if(confirm("Are you sure you want to submit for approval?")){
      for (var i = 0; i < this.selectRecords.length; i++) {
        this.selectRecords[i].rejectionNotes = this.rejectNotesAll;
        }  
      this.crbService.approverejectAll(this.selectRecords,s).subscribe(resp=>{
        this.message=resp.message;
      this.ngOnInit();
      this.modalService.dismissAll();
    })
    }
  }

}
