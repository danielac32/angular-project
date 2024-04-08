import { Component, Input ,OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reservation,ReservationUser } from '../reservations/reservation.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-card',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.css'
})
export class ReservationCardComponent implements OnInit {

    @Input() public reservation?: ReservationUser;//Reservation;
    currentDate: Date = new Date();
    startDate?:Date;
    endDate?:Date;


    ngOnInit(): void {

      console.log("card: ",this.reservation?.user.direction?.address)
      if(this.reservation){
          this.startDate=new Date(this.reservation?.startDate);
          this.endDate=new Date(this.reservation?.endDate);
          this.startDate?.setHours(this.startDate.getHours() + 4);
          this.endDate?.setHours(this.endDate.getHours() + 4);
      }

    }

}

