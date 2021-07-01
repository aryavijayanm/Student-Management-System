import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { map } from 'rxjs/operators';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  commonHeader = {'Content-Type': 'application/json'}
  constructor(private http : HttpClient) { }


  adminAuth(data: any){
    console.log('admin auth');
    return this.http.post(baseUrl+'/adminAuth',data);
  }
  
   getData() {    
    return this.http.get(baseUrl+'/getData', {}).pipe(map((response: any) => response));
  } 

}
