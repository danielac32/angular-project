import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule/*,FormsModule*/} from '@angular/forms';

//import { provideHttpClient } from '@angular/common/http';
//import { provideClientHydration } from '@angular/platform-browser';
//import { DataService } from '../shared/service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import  {UserUpdate} from '../auth/auth-login.interface';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [AuthService]

})


export class ProfileComponent implements OnInit {
  
  updateForm!: FormGroup;
  person: UserUpdate | null = null;


  constructor(private formBuilder: FormBuilder,private router: Router,private authService: AuthService) {}


  ngOnInit(): void {
     this.person = this.authService.getUser()

     if(this.person){
        this.updateForm = this.formBuilder.group({
          name: [this.person.name, Validators.required], // Campo name con validación de requerido
          email: [this.person.email, [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          password2: ['', [Validators.required, Validators.minLength(6)]],
          directionId: [this.person.directionId, [Validators.required]],
        });
     }
     
     //console.log("perfil: ",this.authService.getUser())
  }
  onSubmit(): void {
        if(this.updateForm.valid && this.person) {
          /* const name = this.updateForm.get('name')!.value;
           const email = this.updateForm.get('email')!.value;
           const direction = this.updateForm.get('direction')!.value;
           const password = this.updateForm.get('password')!.value;
           const password2 = this.updateForm.get('password2')!.value;*/
          const { name, email, directionId, password, password2 } = this.updateForm.value;

            

           
           this.authService.updateUser(this.person.email,this.updateForm.value).subscribe(response => {
              if (response.status===200) {
                  console.log("ok");
                  this.router.navigate(['/login']);
              }
               
           }, error => {
              console.error('Error en la solicitud de inicio de sesión:', error);
              //alert('Inicio de sesión fallido. Por favor, verifica tu correo electrónico y contraseña.');
              // Aquí puedes manejar los errores, como mostrar un mensaje de error al usuario
           });
       }
  }

}
