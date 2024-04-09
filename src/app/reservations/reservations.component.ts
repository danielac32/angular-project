import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarReservartionsComponent } from './components/side-bar-reservartions/side-bar-reservartions.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SideBarReservartionsComponent,
  ],
  providers: [],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {}
