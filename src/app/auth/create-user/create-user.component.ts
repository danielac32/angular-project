import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { DirectionsService } from '../../directions/directions.service';
import { User,CreateUser } from './create-user.interface';

import { Direction } from '../../directions/directions.interface';


@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, HttpClientModule],
  providers: [AuthService,DirectionsService],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
 constructor(
    private fb: FormBuilder,
    private directionsService: DirectionsService,
    private router: Router,
    private authService: AuthService
  ) {}
  public directions?: Direction[] = []


  public myForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    selectedItem: ["", [Validators.required]],
    rol: ['', Validators.required],
  });


  ngOnInit(): void {

     this.directionsService.findAll().subscribe(({ directions }) => {
        this.directions = directions;
     }, error => {
        console.error('Error en la solicitud :', error);
        alert('Error en la solicitud :');
     });


  }


  onSubmit():void{
      if(!this.myForm.valid) return;
      
      const { name, email, password, selectedItem,rol} = this.myForm.value;
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Selected item:', selectedItem);
      console.log('Rol:', rol);
      this.authService.createUser({
                                                  name, 
                                                  email, 
                                                  password, 
                                                  directionId:Number(selectedItem), 
                                                  rol
                                              })
      .subscribe(esponse => {
        const parametros: NavigationExtras = {
        queryParams: {
          status: 'ok',
          message: 'Usuario Creado'
        }
      };
      this.router.navigate(['/dashboard'],parametros);
     }, error => {
        console.error('Error en la solicitud :', error);
        alert('Error en la solicitud :');
     });

  }
}
