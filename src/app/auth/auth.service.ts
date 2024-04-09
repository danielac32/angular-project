import { Injectable } from '@angular/core';
import  {User,UserUpdate,UserResponse2,loginUser,UserResponse,UserUpdateActive} from './auth-login.interface';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {CreateUser} from "./create-user/create-user.interface"




@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private baseUrl = 'http://localhost:4000';
 person: UserUpdate | null = null;


  constructor(private httpClient: HttpClient,private router: Router) { }
  
  updateRol(email:string,rol:string):Observable<UserResponse>{
      const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.patch<UserResponse>(`${ this.baseUrl }/userRol/${email}`,{rol: rol},{ headers });
      }
      return new Observable<UserResponse>();
  }


  getUserById(email:string):Observable<UserResponse>{
      const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.get<UserResponse>(`${ this.baseUrl }/users/${email}`,{ headers });
      }
      return new Observable<UserResponse>();
  }


  allUser():Observable<UserResponse>{
    const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.get<UserResponse>(`${ this.baseUrl }/users/`,{ headers });
      }
      return new Observable<UserResponse>();
   }
  
  createUser(newUser: CreateUser):Observable<CreateUser>{
      const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.post<CreateUser>(`${ this.baseUrl }/users`, {...newUser},{ headers });
      }
      return new Observable<CreateUser>();
  }
  
  updateUserActive(email:string,active:UserUpdateActive):Observable<UserResponse2>{
  const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
         return this.httpClient.patch<UserResponse2>(`${ this.baseUrl }/userActive/${email}`, {
              isActive: active.isActive
          },{ headers });
      }
      return new Observable<UserResponse2>();
  }

  updateUser(email:string,user:UserUpdate):Observable<UserResponse2>{
  const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
         return this.httpClient.patch<UserResponse2>(`${ this.baseUrl }/users/${email}`, {
              name: user.name,
              email: user.email,
              password: user.password,
              directionId: user.directionId
          },{ headers });
      }
      return new Observable<UserResponse2>();
  }



  login(email:string,password:string):Observable<loginUser>{
  	const user :User={
  		email:email,
  		password:password
  	}
  	return this.httpClient.post<loginUser>(`${ this.baseUrl }/auth/login`, {
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
    if(!user) return "";
    return user.name;
  }
  

  getUserEmail(): string{
    const userInfo = localStorage.getItem('userCurrent');
    const user = userInfo ? JSON.parse(userInfo) : null;
    if(!user) return "";
    return user.email;
  }


  getUser(){
    const userInfo = localStorage.getItem('userCurrent');
    const user = userInfo ? JSON.parse(userInfo) : null;
    return user;
  }
  getRol(){
    const userInfo = localStorage.getItem('userCurrent');
    const user = userInfo ? JSON.parse(userInfo) : null;
    if(!user) return "";
    return user.rol;
  }



  
}
