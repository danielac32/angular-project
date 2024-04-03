import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import  {User} from './auth-login.interface';
import { Router } from '@angular/router';
//import { DataService } from '../shared/service';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  providers: [AuthService]
})


export class AuthComponent implements OnInit {
loginForm: FormGroup;
public isLoggedIn: boolean = false;

  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router,/*private dataService: DataService*/) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
     localStorage.setItem('accessToken','....');
  }
  onSubmit(): void {
    if(this.loginForm.valid) {
       const email = this.loginForm.get('email')!.value;
       const password = this.loginForm.get('password')!.value;
       console.log(email,password);

       this.authService.login(email, password).subscribe(response => {
          console.log('Respuesta del servidor:', response.user);
          if (response.status===200) {
              console.log(response.user);
              localStorage.setItem('accessToken', response.token);
              this.router.navigate(['/dashboard']);
          }
       }, error => {
          console.error('Error en la solicitud de inicio de sesión:', error);
          //alert('Inicio de sesión fallido. Por favor, verifica tu correo electrónico y contraseña.');
          // Aquí puedes manejar los errores, como mostrar un mensaje de error al usuario
       });
       
    }
}




}
