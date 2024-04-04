import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservations/reservation.interface';
import { CommonModule } from '@angular/common';
import { ReservationsService } from '../services/reservations.service';
import { HttpClientModule } from '@angular/common/http';
import { ReservationCardComponent } from '../reservation-card/reservation-card.component';


@Component({
  selector: 'app-index-reservations',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReservationCardComponent],
  providers: [ReservationsService],
  templateUrl: './index-reservations.component.html',
  styleUrl: './index-reservations.component.css'
})
export class IndexReservationsComponent implements OnInit {
  
  public reservations: Reservation[] = [];
  public statusFilter: string = 'pending'; // Variable para almacenar el estado de filtro

  constructor(
    private reservationsService: ReservationsService
  ) {}
  
  ngOnInit(): void {
    this.loadReservations(); // Cargar reservas al inicio
  }

  loadReservations(): void {
    // Usar la variable statusFilter como argumento para allReservations
    this.reservationsService.allReservations(this.statusFilter)
      .subscribe(({ reservations }) => (this.reservations = reservations));
  }

  // Método para cambiar el filtro de estado
  changeStatusFilter(newStatus: string): void {
    this.statusFilter = newStatus;
    this.loadReservations(); // Volver a cargar las reservas con el nuevo filtro
  }
  
}
