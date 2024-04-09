import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component'; // Ejemplo de componente para la página de inicio
import { ProfileComponent } from './profile/profile.component'; // Ejemplo de componente para la página de perfil
import { ReservationsComponent } from './reservations/layout/reservations.component'; // Ejemplo de componente para la página de perfil

import { IndexReservationsComponent } from './reservations/index-reservations/index-reservations.component';
import { ReservationScreenComponent } from './reservations/reservation-screen/reservation-screen.component';
import { CreateReservationsComponent } from './reservations/create-reservations/create-reservations.component';
import { CreateUserComponent } from './auth/create-user/create-user.component'
import { UsersComponent } from './auth/users/users.component'
import {EditarComponent} from './auth/users/editar/editar.component'
//import { AuthGuard } from './auth/auth.guard';
import { AuthGuard } from './auth/auth.guard';


export const routes: Routes = [
   { path: 'login', component: AuthComponent }, // Ruta para el componente de autenticación
   { path: 'dashboard', component: DashboardComponent, /*canActivate: [AuthGuard], */children: [
	    { path: 'home', component: HomeComponent, data: { rol:'admin' } },
	    { path: 'profile', component: ProfileComponent },
	    { path: 'reservations', component: ReservationsComponent, children:[
			{ path: 'reservations', component: IndexReservationsComponent },
			{ path: 'create', component: CreateReservationsComponent },
	    ]}
    // Otros componentes del dashboard
  ]},
  { path: 'reservations/:id', component: ReservationScreenComponent },
  { path: 'create-user', component: CreateUserComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent,canActivate: [AuthGuard], data: { rol:'admin' },children:[
  		{path: 'editar', component: EditarComponent,canActivate: [AuthGuard], data: { rol:'admin' }}
  		]},
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirige a la página de inicio al componente de autenticación

];