import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocationStaging } from './LocationStaging';


@Injectable({
    providedIn : 'root'
})
export class LocationNormalization {
    private baseUrl:string;

    
    constructor(private http:HttpClient){
        this.baseUrl='http://localhost:8080/';
    }
    getAllStaging():Observable<LocationStaging[]>{
        const newurl=`${this.baseUrl}/location/allStaging`;
        return this.http.get<LocationStaging[]>(newurl);
    }
}