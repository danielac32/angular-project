import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Router,NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule/*,FormsModule*/} from '@angular/forms';
//import { MatDialog } from '@angular/material/dialog';

//import { provideHttpClient } from '@angular/common/http';
//import { provideClientHydration } from '@angular/platform-browser';
//import { DataService } from '../shared/service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { DirectionsService } from '../directions/directions.service';
import  {UserUpdate} from '../auth/auth-login.interface';
import  {UserProfile} from '../auth/auth-login.interface';

import { DirectionResponse,Direction } from '../directions/directions.interface';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [AuthService,DirectionsService]

})
 

export class ProfileComponent implements OnInit {
  
  updateForm!: FormGroup;
  person: UserUpdate | null = null;
  view !:boolean;
  newUser !:UserUpdate;
  direction!:string;
  public directions?: Direction[] = []


  constructor(private formBuilder: FormBuilder,private router: Router,private authService: AuthService,private directionsService: DirectionsService) {}

  



  ngOnInit(): void {

    this.view=true;
     this.person = this.authService.getUser()
     
     this.directionsService.findAll().subscribe(({ directions }) => {
        
        this.directions = directions;
        if(this.person){

           const direction = this.directions.find((direction:Direction) => direction.id === this.person?.directionId);
            if (direction) {
              this.direction = direction.address; // Suponiendo que 'address' es la propiedad que deseas asignar a 'this.direction'
            } else {
              console.log('No se encontró ninguna dirección con el ID proporcionado.');
              alert('No se encontró ninguna dirección con el ID proporcionado.');
            }
        }
        //\console.log("aquii: ",this.directions[0].address )
     }, error => {
        console.error('Error en la solicitud :', error);
        alert('Error en la solicitud :');
     });
     
 
     
     

     if(this.person ){
        this.updateForm = this.formBuilder.group({
          name: [this.person.name, Validators.required], // Campo name con validación de requerido
          email: [this.person.email, [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          password2: ['', [Validators.required, Validators.minLength(6)]],
          ///directionId: [this.person.directionId, [Validators.required]],
          selectedItem: ['', Validators.required]
        });
     }

      
  }

  handleClick() {
    this.view=!this.view;
  }


 


  onSubmit(): void {
        if(!this.updateForm.valid) return;
        if(this.updateForm.valid && this.person) {
          /* const name = this.updateForm.get('name')!.value;
           const email = this.updateForm.get('email')!.value;
           const direction = this.updateForm.get('direction')!.value;
           const password = this.updateForm.get('password')!.value;
           const password2 = this.updateForm.get('password2')!.value;*/

          const { name, email, selectedItem, password, password2 } = this.updateForm.value;
        

           if(password !== password2){
               console.log('Las contraseñas no coinciden')
               const parametros: NavigationExtras = {
                queryParams: {
                  status: 'error',
                  message: 'Las contraseñas no coinciden'
                }
              };
              this.router.navigate(['/dashboard'],parametros);
           }else{

              this.newUser={
                  name:name,
                  email:email,
                  password:password,
                  directionId:Number(selectedItem)
                };


              this.authService.updateUser(this.person.email,this.newUser/*this.updateForm.value*/).subscribe(response => {
                if (response.status===200) {
                    console.log("ok");
                    this.router.navigate(['/login']);
                }
                 
             }, error => {
                console.error('Error en la solicitud ', error);
                alert('Error en la solicitud :');
             });
          }
       }
  }

}
