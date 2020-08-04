import { Component, OnInit } from '@angular/core';
import { LocationStaging } from 'src/app/LocationStaging';
import { LocationNormalization } from 'src/app/LocationNormalization.service';

@Component({
  selector: 'app-allapproval',
  templateUrl: './allapproval.component.html',
  styleUrls: ['./allapproval.component.css']
})
export class AllapprovalComponent implements OnInit {
  allapproval:LocationStaging[];

  constructor(private locationNormalization:LocationNormalization) { }

  ngOnInit(): void {
    this.locationNormalization.getAllApproval().subscribe(resp=>{
      this.allapproval=resp;
    })
  }

}
