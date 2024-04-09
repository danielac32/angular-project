import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute ,RouterStateSnapshot} from '@angular/router';
import { UserResponse ,__user,UserUpdateActive} from '../auth/auth-login.interface'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,RouterOutlet,HttpClientModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [AuthService]
})
export class DashboardComponent implements OnInit {
  sharedData: any;
  userName: string = '';
  message:any;
  status:any;
  public users: __user[] = [];
  rol?:string;

  constructor(private route: ActivatedRoute,private router: Router,private authService: AuthService/*,private dataService: DataService*/) {}

	ngOnInit(): void {
 
    this.route.queryParams.subscribe(params => {
    const parametro1 = params['status'];
    const parametro2 = params['message'];
    
    //console.log('status:', parametro1);
    //console.log('message:', parametro2);
    this.status=parametro1;
    this.message=parametro2;
  });

    this.userName = this.authService.getUserName();
    this.rol=this.authService.getRol();
    console.log("rol: ",this.rol)



    /*this.authService.allUser().subscribe(({users}) => {
        this.users = users
       // console.log("aquii: ",this.users[0].direction?.address )
     }, error => {
        console.error('Error en la solicitud :', error);
        alert('Error en la solicitud :dashboard');
     });*/


     

	}

 logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
 }

 

  
}
