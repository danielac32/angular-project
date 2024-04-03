import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
 import { provideClientHydration } from '@angular/platform-browser';
//import { DataService } from '../shared/service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,RouterOutlet,HttpClientModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [AuthService]
})
export class DashboardComponent implements OnInit {
  sharedData: any;
  constructor(private router: Router,private authService: AuthService/*,private dataService: DataService*/) {}

	ngOnInit(): void {

	}

 logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
 }



}
