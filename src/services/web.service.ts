import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class WebService {
    commonHeader = {'Content-Type': 'application/json'}
    constructor(private http: HttpClient) {}

    postData(url: string, auth: string, data:any) {    
        const serviceUrl = environment.baseUrl;
        return this.http.post(`${serviceUrl + url}`, data, {}).pipe(map((response: any) => response));
      }
    
      getData(url: string) {    
        const serviceUrl = environment.baseUrl;
        return this.http.get(`${serviceUrl + url}`, {}).pipe(map((response: any) => response));
      }
}