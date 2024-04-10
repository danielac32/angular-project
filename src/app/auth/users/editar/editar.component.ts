import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';
//import { DirectionsService } from '../../../directions/directions.service';
import  {UserUpdate,UserProfile,UserResponse} from '../../auth-login.interface';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';

import { DirectionResponse } from '../../../directions/directions.interface';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterOutlet,HttpClientModule,CommonModule],
  providers: [AuthService],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {
  
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,) {}

  idUser?:string;

  public updateForm: FormGroup = this.fb.group({
    rol: ["", Validators.required]
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const parametro = params['parametro'];
      if(params['parametro2']==='delete'){
         console.log("eliminar: ",parametro)

      }
      this.idUser=parametro;
      //console.log('Parámetro recibido:', parametro);
    });
  }

  onSubmit(): void {
        if(this.updateForm.valid && this.idUser !== undefined){
           const rol = this.updateForm.get('rol')!.value;
           

           console.log("editar: ",rol)
           this.authService.updateRol(this.idUser,rol).subscribe(response => {

           }, error => {
              console.error('Error en la solicitud :', error);
              alert('Error en la solicitud :');
           });

           this.router.navigate(['/users'],{ queryParams: { reload: true } });
        }
  }
}
