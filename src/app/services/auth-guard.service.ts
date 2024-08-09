import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isAuthenticated().pipe(
      map((authenticated) => {
        console.log('autheticated ', authenticated)
        if (authenticated) {
          return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }),
      catchError((error) => {
        console.error('Authentication error:', error);
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return of(false);
      })
    );
  }

  private isAuthenticated(): Observable<boolean> {
    // Replace with your authentication logic
    return of(!!localStorage.getItem('currentUser'));
  }

  // canActivate(): boolean {
  //   if (localStorage.getItem('currentUser')) {
  //     return true;
  //   }
  //   this.router.navigate(['/login']);
  //   return false;
  // }
}
