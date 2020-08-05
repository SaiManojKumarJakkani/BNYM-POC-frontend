import { Component, OnInit } from '@angular/core';
import { CRBInventoryStaging } from 'src/app/modal/CRBInventoryStaging';
import { CrbInventoryService } from 'src/app/services/crb-inventory.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-allapproval',
  templateUrl: './allapproval.component.html',
  styleUrls: ['./allapproval.component.css']
})
export class AllapprovalComponent implements OnInit {

  allapproval : CRBInventoryStaging[];
  closeResult: string;

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

}
