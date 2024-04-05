import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { ReservationsService } from '../services/reservations.service';
import { Reservation} from '../reservations/reservation.interface';
import { StatusReserveTypes } from '../reservations/status-reserve.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reservation-screen',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  providers: [ReservationsService],
  templateUrl: './reservation-screen.component.html',
  styleUrl: './reservation-screen.component.css'
})


 


export class ReservationScreenComponent implements OnInit{
 reservation!: Reservation;
 reservationId?:any;




  constructor(
    private reservationsServices: ReservationsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.reservationId = params.get('id');
      console.log(this.reservationId);
      this.reservationsServices.reservationById(this.reservationId).subscribe( ({ reservation }) => {
      this.reservation = reservation;
      console.log(this.reservation)
     }, error => {
        console.error('Error en la solicitud :', error);
     });
    });
 
  /*
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.reservationsServices.reservationById(id))
      )
      .subscribe(reservation => {
        if(!reservation) return this.router.navigate(['/dashboard/reservations']);

        this.reservation = reservation;
        console.log(reservation)
        return;
      })*/
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
