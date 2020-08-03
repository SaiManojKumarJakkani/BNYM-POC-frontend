import { Component, OnInit } from '@angular/core';
import { LocationStaging } from 'src/app/LocationStaging';
import { LocationNormalization } from 'src/app/LocationNormalization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allstaging',
  templateUrl: './allstaging.component.html',
  styleUrls: ['./allstaging.component.css']
})
export class AllstagingComponent implements OnInit {
allstaging:LocationStaging[];
  constructor(private locationNormalization:LocationNormalization) { }

  ngOnInit(){
    this.locationNormalization.getAllStaging().subscribe(resp=>{
      this.allstaging=resp;
    })
  }

}
