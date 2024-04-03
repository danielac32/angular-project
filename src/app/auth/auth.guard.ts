import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Verificar si el usuario está autenticado
    if (this.authService.isLoggedIn()) {
      return true; // Permitir la navegación
    } else {
      // Si el usuario no está autenticado, redirigir al componente de inicio de sesión
      this.router.navigate(['/login']);
      return false; // No permitir la navegación
    }
  }
}
