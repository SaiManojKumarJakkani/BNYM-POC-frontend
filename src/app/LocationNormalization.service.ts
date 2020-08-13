import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocationStaging } from './LocationStaging';
import { map } from 'rxjs/operators';
import { ResponseMessage } from './ResponseMessage';


@Injectable({
    providedIn : 'root'
})
export class LocationNormalization {
    private baseUrl:string;

    
    constructor(private http:HttpClient){
        this.baseUrl='http://localhost:8080/location/';
    }
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json','observe':'response'}
        )
    };

    getAllStaging():Observable<LocationStaging[]>{
        const newurl=`${this.baseUrl}/allStaging`;
        return this.http.get<LocationStaging[]>(newurl);
    }
    getAllApproval():Observable<LocationStaging[]>{
        const newurl=`${this.baseUrl}/allInApproval`;
        return this.http.get<LocationStaging[]>(newurl);
    }
    uploadFile(file:File):Observable<HttpEvent<any>>{
        const formdata: FormData = new FormData();
        formdata.append('file', file);
        const req = new HttpRequest('POST', `${this.baseUrl}/uploaddetails`, formdata, {
        reportProgress: true,
        responseType: 'json'
        });
        return this.http.request(req);
        //const newurl=`${this.baseUrl}/uploaddetails`;
        //return this.http.post(newurl,file).pipe(map((res:any)=>res.json()))
    }
    saveDetails(l:LocationStaging):Observable<ResponseMessage>{
        const newurl=`${this.baseUrl}/savedetails`;
        return this.http.post<ResponseMessage>(newurl,l,this.httpOptions);
    }
    toInApproval(l:LocationStaging[]):Observable<ResponseMessage>{
        const newurl=`${this.baseUrl}/toInApproval`;
        return this.http.put<ResponseMessage>(newurl,l);
    }
    approvereject(l:LocationStaging,a:string):Observable<ResponseMessage>{
        const newurl=`${this.baseUrl}/approveorreject/${a}`;
        return this.http.put<ResponseMessage>(newurl,l);
    }
    updateDetails(l:LocationStaging):Observable<ResponseMessage>{
        const newurl=`${this.baseUrl}/updateNormalized`;
        return this.http.put<ResponseMessage>(newurl,l);
    }
    approverejectAll(l:LocationStaging[],s:string):Observable<ResponseMessage>{
        const newurl=`${this.baseUrl}/approveorrejectall/${s}`;
        return this.http.put<ResponseMessage>(newurl,l);
    }
}