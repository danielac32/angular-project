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

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [AuthService,DirectionsService]

})

/*interface Direction {
    id?: number;
    address: string;
};*/


export class ProfileComponent implements OnInit {
  
  updateForm!: FormGroup;
  person: UserUpdate | null = null;
  items!: string[];
  user!: UserProfile;
  direction!:string;
  view !:boolean;
  newUser !:UserUpdate;


  constructor(private formBuilder: FormBuilder,private router: Router,private authService: AuthService,private directionsService: DirectionsService) {}


  ngOnInit(): void {

    this.view=true;
     this.person = this.authService.getUser()
     this.directionsService.findAll().subscribe(response => {
        this.items = response.directions.map((direction: { address: string }) => direction.address);

        if (this.items && this.person && this.person.directionId !== null && this.person.directionId !== undefined) {
            this.direction = this.items[this.person.directionId];
        }
        console.log(" direction: ",this.items);
     }, error => {
        console.error('Error en la solicitud :', error);
     });
     

     console.log("person : ",this.person)
  
     
     
     

     if(this.person){
        this.updateForm = this.formBuilder.group({
          name: [this.person.name, Validators.required], // Campo name con validación de requerido
          email: [this.person.email, [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          password2: ['', [Validators.required, Validators.minLength(6)]],
          ///directionId: [this.person.directionId, [Validators.required]],
          selectedItem: ['']
        });
     }
     

    
     /* this.user={
          name: this.person.name,
          email:this.person.email,
          direction:this.items[this.person.directionId]
      }
          console.log("user: ",this.user)*/
      
  }

  handleClick() {
    this.view=!this.view;
  }


  buscarStringEnLista(lista: string[], cadena: string): number {
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] === cadena) {
            return i; 
        }
    }
    return -1;  
  }


  onSubmit(): void {
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
                  directionId:this.buscarStringEnLista(this.items,selectedItem)
                };


              this.authService.updateUser(this.person.email,this.newUser/*this.updateForm.value*/).subscribe(response => {
                if (response.status===200) {
                    console.log("ok");
                    this.router.navigate(['/login']);
                }
                 
             }, error => {
                console.error('Error en la solicitud de inicio de sesión:', error);
             });
          }
       }
  }

}
