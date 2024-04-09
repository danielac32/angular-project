import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { ReservationsService } from '../services/reservations.service';
import { Reservation} from '../interfaces/reservation.interface';
import { StatusReserveTypes } from '../interfaces/status-reserve.interface';
import { CommonModule } from '@angular/common';
import { SalonService } from '../../salon/salon.service';
import { SalonResponse,Salon } from '../../salon/salon.interface';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-reservation-screen',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  providers: [ReservationsService,SalonService,AuthService],
  templateUrl: './reservation-screen.component.html',
  styleUrl: './reservation-screen.component.css'
})


 


export class ReservationScreenComponent implements OnInit{
 reservation!: Reservation;
 reservationId?:any;
 
 salon!:string;
 public salons?: Salon[] = []
 currentDate: Date = new Date();
 startDate?:Date;
 endDate?:Date;
 rol?:string;




  constructor(
    private reservationsServices: ReservationsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private salonService: SalonService,
    private authService: AuthService
  ) {}

ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.reservationId = params.get('id');
      console.log(this.reservationId);
      this.reservationsServices.reservationById(this.reservationId).subscribe( ({ reservation }) => {
      this.reservation = reservation;
      console.log(this.reservation)

      
      this.startDate=new Date(this.reservation.startDate);
      this.endDate=new Date(this.reservation.endDate);

      this.startDate?.setHours(this.startDate.getHours() + 4);
      this.endDate?.setHours(this.endDate.getHours() + 4);

      console.log(this.startDate);
      console.log(this.endDate);

      this.salonService.findAll().subscribe(({ salones }) => {
            this.salons = salones;
            //console.log("aquii: ",this.salons[0].name )
            if(this.reservation){
                const found = this.salons.find((salon:Salon) => salon.id === this.reservation?.salonId);
                if(found){
                   console.log(found)
                   this.salon=found.name;
                }
            }
      }, error => {
            console.error('Error en la solicitud :', error);
            alert('Error en la solicitud :findAll');
      });
     }, error => {
        console.error('Error en la solicitud :', error);
        alert('Error en la solicitud :reservationById');
     });
    });
    this.rol=this.authService.getRol();


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
