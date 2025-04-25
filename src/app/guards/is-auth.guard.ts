import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const isAuthGuard: CanActivateFn = () => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  return _authService.validateToken()
             .pipe(
              tap( (isAuthenticated) => {
                if(!isAuthenticated){
                  _router.navigateByUrl('/login');
                }
              })
             );
};

export const canMatch: CanMatchFn = () => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  return _authService.validateToken()
             .pipe(
              tap( (isAuthenticated) => {
                if(!isAuthenticated){
                  _router.navigateByUrl('/login');
                }
              })
             );
};