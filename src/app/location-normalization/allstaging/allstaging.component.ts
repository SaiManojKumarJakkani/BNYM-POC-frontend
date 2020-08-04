import { Component, OnInit } from '@angular/core';
import { LocationStaging } from 'src/app/LocationStaging';
import { LocationNormalization } from 'src/app/LocationNormalization.service';
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
  constructor(private locationNormalization:LocationNormalization) { }

  ngOnInit(){
    this.locationNormalization.getAllStaging().subscribe(resp=>{
      this.allstaging=resp;
    })
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  upload() {
    if(confirm("Are you sure, you want to Upload this file ?")) {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.locationNormalization.uploadFile(this.currentFileUpload).subscribe((event) => {
      console.log("check",event);
      
      if (event instanceof HttpResponse) {
        this.message = event.body.toString();
        alert(this.message);
      }
      this.ngOnInit();
    });
    this.selectedFiles = undefined;
  }
}
}
