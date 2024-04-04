import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationsService } from '../services/reservations.service';
import { Router,NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-create-reservations',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [ReservationsService],
  templateUrl: './create-reservations.component.html',
  styleUrl: './create-reservations.component.css'
})
export class CreateReservationsComponent {

public myForm: FormGroup = this.fb.group({
    startDate: ['2024-04-01T08:00:00Z', Validators.required],
    endDate: ['2024-04-01T08:00:00Z', Validators.required],
    requerimiento: ['Reservacion', Validators.required],
    cantidad_persona: [12, [Validators.required, Validators.min(1)]],
    descripcion: ['Creando una reservacion desde Angular', Validators.required],
    userId: [1, Validators.required],
    salonId: [1, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private reservationsService: ReservationsService,
    private router: Router
  ) {}
  
  createReservation() {
    if(!this.myForm.valid) return;
    this.reservationsService.createReservation(this.myForm.value)
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
