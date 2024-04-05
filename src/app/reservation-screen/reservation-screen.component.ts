import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { ReservationsService } from '../services/reservations.service';
import { Reservation} from '../reservations/reservation.interface';
import { StatusReserveTypes } from '../reservations/status-reserve.interface';
import { CommonModule } from '@angular/common';
import { SalonService } from '../salon/salon.service';

@Component({
  selector: 'app-reservation-screen',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  providers: [ReservationsService,SalonService],
  templateUrl: './reservation-screen.component.html',
  styleUrl: './reservation-screen.component.css'
})


 


export class ReservationScreenComponent implements OnInit{
 reservation!: Reservation;
 reservationId?:any;
 items!: string[];
 salon!:string;


  constructor(
    private reservationsServices: ReservationsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private salonService: SalonService,
  ) {}

ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.reservationId = params.get('id');
      console.log(this.reservationId);
      this.reservationsServices.reservationById(this.reservationId).subscribe( ({ reservation }) => {
      this.reservation = reservation;
      console.log(this.reservation)
      this.salonService.findAll().subscribe(({ salones }) => {
            this.items = salones.map(salon => salon.name);
            this.salon=this.items[this.reservation.salonId-1]
            console.log("salon: ",this.salon)
      }, error => {
            console.error('Error en la solicitud :', error);
      });
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


buscarStringEnLista(lista: string[], cadena: string): number {
    return lista.indexOf(cadena);
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
