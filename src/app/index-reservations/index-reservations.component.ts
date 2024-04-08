import { Component, OnInit } from '@angular/core';
import { Reservation,ReservationUser,ReservationWithUser } from '../reservations/reservation.interface';
import { CommonModule } from '@angular/common';
import { ReservationsService } from '../services/reservations.service';
import { HttpClientModule } from '@angular/common/http';
import { ReservationCardComponent } from '../reservation-card/reservation-card.component';
import { SalonService } from '../salon/salon.service';
import { AuthService } from '../auth/auth.service';

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
  public reservations2: ReservationUser[] = [];
  public reservations3: ReservationUser[] = [];


  public statusFilter: string = 'pending'; // Variable para almacenar el estado de filtro
  emailUser?:string;
  rol?:string;



  constructor(
    private reservationsService: ReservationsService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {

    this.loadReservations(); // Cargar reservas al inicio
    this.loadReservations2();

    this.emailUser = this.authService.getUserEmail();
    this.loadReservations3();

    this.rol=this.authService.getRol();

  }

  loadReservations(): void {
    // Usar la variable statusFilter como argumento para allReservations
    this.reservationsService.allReservations(this.statusFilter)
      .subscribe(({ reservations }) => (this.reservations = reservations));
  }
  
  loadReservations2(): void {
    // Usar la variable statusFilter como argumento para allReservations
    this.reservationsService.allReservationWithUsers(this.statusFilter)
      .subscribe(({ reservations }) => (
          this.reservations2 = reservations
      ));
  }


  loadReservations3(): void {
    if(this.emailUser){
        this.reservationsService.allReservationByUser(this.emailUser,this.statusFilter)
        .subscribe(({reservations}) => (
            this.reservations3 = reservations
        ));
    }
  }

  // Método para cambiar el filtro de estado
  changeStatusFilter(newStatus: string): void {
    this.statusFilter = newStatus;
    this.loadReservations(); // Volver a cargar las reservas con el nuevo filtro
    this.loadReservations2();
    this.loadReservations3();
  }
  
}
