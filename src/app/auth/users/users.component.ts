import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
//import { provideHttpClient } from '@angular/common/http';
//import { provideClientHydration } from '@angular/platform-browser';
//import { DataService } from '../shared/service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserResponse ,__user,UserUpdateActive} from '../auth-login.interface'


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink,RouterOutlet,HttpClientModule,CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})




export class UsersComponent implements OnInit {
public users: __user[] = [];
 
constructor(private route: ActivatedRoute,private router: Router,private authService: AuthService/*,private dataService: DataService*/) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
       this.route.queryParams.subscribe(params => {
       const parametro = params['reload'];
       if(parametro){
         this.loadUsers();
       }
      });
    });

    
  }

  handleClick():void{
    this.router.navigate(['/dashboard/home']);
  }


  loadUsers():void{
    this.authService.allUser().subscribe(({users}) => {
        this.users = users
       // console.log("aquii: ",this.users[0].direction?.address )
     }, error => {
        console.error('Error en la solicitud :', error);
     });
  }

  

  editar(id?:string){
      if (id !== undefined) {
         this.router.navigate(['/users/editar'],{ queryParams: { parametro: id } });
      }
  }

  eliminar(id?:string){
      if (id !== undefined) {
         this.router.navigate(['/users/editar'],{ queryParams: { parametro: id ,parametro2:"delete"} });
      }
  }



  activar(id?: string) {
    if (id !== undefined) {
      // Aquí puedes usar el ID como necesites
      console.log('ID a desactivar:', id);
      this.authService.updateUserActive(id,{isActive:true}).subscribe(response => {
         // console.log("aquii: ",this.users[0].direction?.address )
        //this.router.navigate(['/users']);
        this.loadUsers();
      }, error => {
          console.error('Error en la solicitud :', error);
      });
      // Llamar a una función o realizar cualquier otra acción con el ID
    } else {
      console.error('El ID es undefined');
    }
  }

  desactivar(id?: string) {
    if (id !== undefined) {
      // Aquí puedes usar el ID como necesites
      console.log('ID a desactivar:', id);
      this.authService.updateUserActive(id,{isActive:false}).subscribe(response => {
         // console.log("aquii: ",this.users[0].direction?.address )
        //this.router.navigate(['/users']);
        this.loadUsers();
      }, error => {
          console.error('Error en la solicitud :', error);
      });
      // Llamar a una función o realizar cualquier otra acción con el ID
    } else {
      console.error('El ID es undefined');
    }
  }


}
