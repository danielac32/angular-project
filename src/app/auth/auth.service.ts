import { Injectable } from '@angular/core';
import  {User,UserUpdate} from './auth-login.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private baseUrl = 'http://localhost:4000';
 person: UserUpdate | null = null;


  constructor(private httpClient: HttpClient,private router: Router) { }
  

  updateUser(email:string,user:UserUpdate):Observable<any>{
   return this.httpClient.patch<UserUpdate>(`${ this.baseUrl }/users/${email}`, {
        name: user.name,
        email: user.email,
        password: user.password,
        directionId: user.directionId
    });
  }



  login(email:string,password:string):Observable<any>{
  	const user :User={
  		email:email,
  		password:password
  	}
  	return this.httpClient.post<User>(`${ this.baseUrl }/auth/login`, {
      ...user
    });

  }
  logout(): void {
    // Eliminar la información de sesión del localStorage
    localStorage.removeItem('accessToken');
    console.log("logout")
    // Redirigir al componente de inicio de sesión o a la página de inicio
    // Ejemplo:
    // this.router.navigate(['/login']);
  }

   isLoggedIn(): boolean {
    // Verificar si hay un token de acceso en el localStorage
    const token = localStorage.getItem('accessToken');
    if(token === '....'){
        return false;
    }
    return !!token;
  }
  
  getUserName(): string{
    const userInfo = localStorage.getItem('userCurrent');
    const user = userInfo ? JSON.parse(userInfo) : null;
    console.log(user.name)
    if(!user) return "";
    return user.name;
  }
  
  getUser(){
    const userInfo = localStorage.getItem('userCurrent');
    const user = userInfo ? JSON.parse(userInfo) : null;
    return user;
  }



  
}
