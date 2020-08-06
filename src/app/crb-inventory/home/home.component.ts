import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id : string;

  constructor() { }

  ngOnInit(): void {
  }
  checkStaging(){
    var e = document.getElementById("staging");
    if(!e.classList.contains("active")){
      e.classList.add("active");
      document.getElementById("approval").classList.remove("active");
    }
  }
  checkApproval(){
    var e = document.getElementById("approval");
    if(!e.classList.contains("active")){
      e.classList.add("active");
      document.getElementById("staging").classList.remove("active");
    }
  }

}
