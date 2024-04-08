import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component'; // Ejemplo de componente para la página de inicio
import { ProfileComponent } from './profile/profile.component'; // Ejemplo de componente para la página de perfil
import { ReservationsComponent } from './reservations/reservations.component'; // Ejemplo de componente para la página de perfil

import { IndexReservationsComponent } from './index-reservations/index-reservations.component';
import { ReservationScreenComponent } from './reservation-screen/reservation-screen.component';
import { CreateReservationsComponent } from './create-reservations/create-reservations.component';
import { CreateUserComponent } from './auth/create-user/create-user.component'
import { UsersComponent } from './auth/users/users.component'
import {EditarComponent} from './auth/users/editar/editar.component'
//import { AuthGuard } from './auth/auth.guard';
import { AuthGuard } from './auth/auth.guard';


export const routes: Routes = [
   { path: 'login', component: AuthComponent }, // Ruta para el componente de autenticación
   { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard], children: [
	    { path: 'home', component: HomeComponent,canActivate: [AuthGuard],data: { rol:'admin' } },
	    { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },
	    //{ path: 'reservations', component: ReservationsComponent,canActivate: [AuthGuard]}
	    { path: 'reservations', component: ReservationsComponent,canActivate: [AuthGuard],children:[
	    		{ path: 'reservations', component: IndexReservationsComponent,canActivate: [AuthGuard] },
	    		{ path: 'create', component: CreateReservationsComponent,canActivate: [AuthGuard] },
	    		//{ path: ':id', component: ReservationScreenComponent,canActivate: [AuthGuard] }
	    ]}
    // Otros componentes del dashboard
  ]},
  { path: 'reservations/:id', component: ReservationScreenComponent },
  { path: 'create-user', component: CreateUserComponent,canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent,canActivate: [AuthGuard],data: { rol:'admin' },children:[
  		{path: 'editar', component: EditarComponent,canActivate: [AuthGuard],data: { rol:'admin' }}
  		]},
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirige a la página de inicio al componente de autenticación

];