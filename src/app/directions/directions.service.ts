import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DirectionsService {
  private baseUrl = 'http://localhost:4000';
  constructor(private httpClient: HttpClient,private router: Router) { }

  findAll():Observable<any>{
  	return this.httpClient.get<any>(`${ this.baseUrl }/directions/`,{});
  }


}
