import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SalonResponse } from '../salon/salon.interface';



@Injectable({
  providedIn: 'root'
})
export class SalonService {
private baseUrl = 'http://localhost:4000';

  constructor(private httpClient: HttpClient,private router: Router) { }

  findAll():Observable<SalonResponse>{
  	return this.httpClient.get<SalonResponse>(`${ this.baseUrl }/salon/`,{});
  }

}
