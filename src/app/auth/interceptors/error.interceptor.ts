import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 || error.status === 403) {
        // Unauthorized - logout and redirect to login
        authService.logout();
        router.navigate(['/auth/login']);
      }

      if (error.status === 500) {
        // Server error
        console.error('Server error:', error);
      }

      return throwError(() => error);
    })
  );
};