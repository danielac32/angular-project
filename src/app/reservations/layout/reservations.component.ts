import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationsService } from '../services/reservations.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideBarReservartionsComponent } from '../components/side-bar-reservartions/side-bar-reservartions.component';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    SideBarReservartionsComponent
  ],
  providers: [ReservationsService],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
  
  constructor(
    private fb: FormBuilder,
    private reservationsService: ReservationsService
  ) {}
  
  
}
