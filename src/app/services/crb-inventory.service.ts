import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse, HttpEvent } from '@angular/common/http';
import { CRBInventoryStaging } from '../modal/CRBInventoryStaging';
import { Observable } from 'rxjs';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ResponseMessage } from '../ResponseMessage';
import { createBrotliCompress } from 'zlib';

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

  uploadFile(file:File):Observable<HttpEvent<any>>{
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/crb/uploadFile`, formdata, {
    reportProgress: true,
    responseType: 'json'
    });
    return this.httpclient.request(req);
}

inApproval(crb : CRBInventoryStaging[]) : Observable<ResponseMessage>{
  const newUrl = `${this.baseUrl}/crb/toInApproval`;
  return this.httpclient.put<ResponseMessage>(newUrl, crb);
} 

updateDetails(crb : CRBInventoryStaging) : Observable<ResponseMessage>{
  const newUrl = `${this.baseUrl}/crb/update`;
  return this.httpclient.put<ResponseMessage>(newUrl, crb);
}

approveOrReject(crb : CRBInventoryStaging, a:string) : Observable<ResponseMessage>{
  const newUrl=`${this.baseUrl}/crb/approvereject/${crb.stagingId}/${a}`;
  return this.httpclient.put<ResponseMessage>(newUrl, crb);
}

approverejectAll( crb : CRBInventoryStaging[], s:string) : Observable<ResponseMessage>{
  const newUrl = `${this.baseUrl}/crb/approverejectAll/${s}`;
  return this.httpclient.put<ResponseMessage>(newUrl, crb);
}



}
