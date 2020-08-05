import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { CRBInventoryStaging } from '../modal/CRBInventoryStaging';
import { Observable } from 'rxjs';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class CrbInventoryService {
  private baseUrl : string;

  constructor( private httpclient : HttpClient) {
    this.baseUrl='http://localhost:8080/';
   }

   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','observe':'response'}
    )
};

   //getAll
  getAllStaging():Observable<CRBInventoryStaging[]>{
    const newurl = `${this.baseUrl}/crb/getAll`;
    return this.httpclient.get<CRBInventoryStaging[]>(newurl);
  }

  //submit
  getAllAprovals(): Observable<CRBInventoryStaging[]>{
    const newurl = `${this.baseUrl}/crb/getInAproval`;
    return this.httpclient.get<CRBInventoryStaging[]>(newurl);
  }

  uploadFile(file:File){
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/crb/uploadFile`, formdata, {
    reportProgress: true,
    responseType: 'json'
    });
    return this.httpclient.request(req);
    //const newurl=`${this.baseUrl}/uploaddetails`;
    //return this.http.post(newurl,file).pipe(map((res:any)=>res.json()))
}
    

}
