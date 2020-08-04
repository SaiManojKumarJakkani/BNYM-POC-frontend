import { Component, OnInit } from '@angular/core';
import { CRBInventoryStaging } from 'src/app/modal/CRBInventoryStaging';
import { CrbInventoryService } from 'src/app/services/crb-inventory.service';

@Component({
  selector: 'app-allapproval',
  templateUrl: './allapproval.component.html',
  styleUrls: ['./allapproval.component.css']
})
export class AllapprovalComponent implements OnInit {

  allapproval : CRBInventoryStaging[];

  constructor(private crbService : CrbInventoryService) { }

  ngOnInit(): void {
      this.crbService.getAllAprovals().subscribe(response => {
        this.allapproval = response;
      })
  }

}
