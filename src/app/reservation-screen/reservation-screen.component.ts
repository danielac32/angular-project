import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { ReservationsService } from '../services/reservations.service';
import { Reservation } from '../reservations/reservation.interface';
import { StatusReserveTypes } from '../reservations/status-reserve.interface';

@Component({
  selector: 'app-reservation-screen',
  standalone: true,
  imports: [HttpClientModule],
  providers: [ReservationsService],
  templateUrl: './reservation-screen.component.html',
  styleUrl: './reservation-screen.component.css'
})
export class ReservationScreenComponent implements OnInit{

public reservation?: Reservation

  constructor(
    private reservationsServices: ReservationsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.reservationsServices.reservationById(id))
      )
      .subscribe(reservation => {
        if(!reservation) return this.router.navigate(['/dashboard/reservations']);

        this.reservation = reservation;
        console.log(reservation)
        return;
      })
  }

  changeStatusInReservation(id: number, status: string) {
    this.reservationsServices.changeStatusInReservation(id, status)
      .subscribe()
      this.router.navigate(['/dashboard/reservations'])
  }

  goBack() {
    this.router.navigate(['/dashboard/reservations'])
  }
}
