import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationsService } from '../services/reservations.service';
import { Router,NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SalonService } from '../salon/salon.service';
import { AuthService } from '../auth/auth.service';
import  {UserResponse} from '../auth/auth-login.interface';
import { CreateReservation } from '../reservations/create-reservation.interface';
import { format } from 'date-fns';



@Component({
  selector: 'app-create-reservations',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, HttpClientModule],
  providers: [AuthService,ReservationsService,SalonService],
  templateUrl: './create-reservations.component.html',
  styleUrl: './create-reservations.component.css'
})



export class CreateReservationsComponent implements OnInit {

public myForm: FormGroup = this.fb.group({
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    requerimiento: ['', Validators.required],
    cantidad_persona: [1, [Validators.required]],
    descripcion: ['', Validators.required],
    ///userId: [1, Validators.required],
    //salonId: [1, Validators.required],
    selectedItem: ["Salón Simón Bolívar", Validators.required]
  });
  items!: string[];
  user!:UserResponse;
  userId!:number;
  create!:CreateReservation;
  salonId!:number;
  
  selectedDateTime: string = '';
  formattedDateTime: string = '';

  constructor(
    private fb: FormBuilder,
    private reservationsService: ReservationsService,
    private salonService: SalonService,
    private router: Router,
    private authService: AuthService
  ) {}


  ngOnInit(): void {

    this.salonService.findAll().subscribe(({ salones }) => {
        this.items = salones.map(salon => salon.name);
        //console.log("aquii: ",this.items )
     }, error => {
        console.error('Error en la solicitud :', error);
     });
     
  }


 formatDateTime() {
    const selectedDate = new Date(this.selectedDateTime);
    this.formattedDateTime = format(selectedDate, "yyyy-MM-dd hh:mm a");
  }

 buscarStringEnLista(lista: string[], cadena: string): number {
    return lista.indexOf(cadena);
  }

  createReservation() {
    if(!this.myForm.valid) return;
     this.user = this.authService.getUser();
 
     const { startDate, endDate, requerimiento, cantidad_persona, descripcion , selectedItem} = this.myForm.value;
     this.salonId = this.buscarStringEnLista(this.items,this.myForm.get('selectedItem')!.value);

     this.reservationsService.createReservation({
                                                startDate, 
                                                endDate, 
                                                requerimiento, 
                                                cantidad_persona, 
                                                descripcion ,
                                                userId:Number(this.user.id),
                                                salonId:this.salonId+1// se le suma uno porque en la base de datos comienza de 1 
                                              })
      .subscribe(esponse => {
        const parametros: NavigationExtras = {
        queryParams: {
          status: 'ok',
          message: 'Reservacion creada'
        }
      };
      this.router.navigate(['/dashboard/reservations'],parametros);
     }, error => {
        console.error('Error en la solicitud :', error);
     });
  };
}
