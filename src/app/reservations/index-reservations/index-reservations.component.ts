import { Component, OnInit } from '@angular/core';
import { Reservation,ReservationUser,ReservationWithUser } from '../interfaces/reservation.interface';
import { CommonModule } from '@angular/common';
import { ReservationsService } from '../services/reservations.service';
import { HttpClientModule } from '@angular/common/http';
import { ReservationCardComponent } from '../components/reservation-card/reservation-card.component';
import { SalonService } from '../../salon/salon.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-index-reservations',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReservationCardComponent],
  providers: [ReservationsService,AuthService],
  templateUrl: './index-reservations.component.html',
  styleUrl: './index-reservations.component.css'
})
export class IndexReservationsComponent implements OnInit {
  public reservations: Reservation[] = [];
  public statusFilter: string = 'pending'; // Variable para almacenar el estado de filtro
  public emailUser? :string;
  public rol? :string;

  constructor(
    private reservationsService: ReservationsService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.rol = this.authService.getRol();
    this.emailUser = this.authService.getUserEmail();
    this.loadReservations(); // Cargar reservas al inicio
  }

  loadReservations(): void {
    // Usar la variable statusFilter como argumento para allReservations
    if(!this.rol || !this.emailUser) return;
    if(this.rol=== 'ADMIN') {
      this.reservationsService.allReservations(this.statusFilter)
        .subscribe(({ reservations}) => (this.reservations = reservations));
      return;
    }

    this.reservationsService.allReservationByUser(this.emailUser,this.statusFilter)
    .subscribe(({reservations}) => (
        this.reservations = reservations
    ));   
  }

  // Método para cambiar el filtro de estado
  changeStatusFilter(newStatus: string): void {
    this.statusFilter = newStatus;
    this.loadReservations(); // Volver a cargar las reservas con el nuevo filtro
  }
  
}
