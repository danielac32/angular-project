import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component'; // Ejemplo de componente para la página de inicio
import { ProfileComponent } from './profile/profile.component'; // Ejemplo de componente para la página de perfil
import { ReservationsComponent } from './reservations/reservations.component'; // Ejemplo de componente para la página de perfil
//import { AuthGuard } from './auth/auth.guard';
import { authGuard } from './auth/guardauth.guard';


export const routes: Routes = [
   { path: 'login', component: AuthComponent }, // Ruta para el componente de autenticación
   { path: 'dashboard', component: DashboardComponent,canActivate: [authGuard], children: [
    { path: 'home', component: HomeComponent,canActivate: [authGuard] },
    { path: 'profile', component: ProfileComponent,canActivate: [authGuard] },
    { path: 'reservations', component: ReservationsComponent,canActivate: [authGuard] },
    // Otros componentes del dashboard
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirige a la página de inicio al componente de autenticación

];