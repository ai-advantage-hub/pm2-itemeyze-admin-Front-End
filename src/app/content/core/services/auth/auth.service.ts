import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
   private httpService:AuthenticationService
   ) {}

  signIn(data: any): any{
    return this.httpService.post(`custom_admin/login`, data);
  }
  forgotPassword(data:any): any {
    return this.httpService.post(`custom_admin/forgot_password`, data);
  }
  resetPassword(data:any): any {
    return this.httpService.post(`custom_admin/ConfirmPassword`, data);
  }
}
