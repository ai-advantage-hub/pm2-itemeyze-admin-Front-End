import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  role:number;
  constructor(private router: Router) {
    
   }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // localStorage.setItem('role', JSON.stringify(3));
    // this.role = JSON.parse(localStorage.getItem('role'));
    if (!localStorage.getItem('authToken')) {

      return true;
    } else if (localStorage.getItem('authToken')) {
      // if(this.role === 3) {
      //   console.log(this.role, "role");
      //   this.router.navigate(['/pages/profile']);
      // }
      // else if(this.role === 1) {
      //   this.router.navigate(['/pages/dashboard']);
      // }
      return false
    }
  }

}
