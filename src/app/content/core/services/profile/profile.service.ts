import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpService:AuthenticationService) { }

  getProfile(){
    return this.httpService.get(`custom_admin/adminprofile`)
  }

  changePassword(body) {
    return this.httpService.put(`custom_admin/reset_password`,body)
  }

  upload(file):Observable<any> {
    const formData = new FormData(); 
    formData.append("file", file);
    return this.httpService.post(`upload_files`, formData)
  }
  updateProfile(body){
    return this.httpService.put(`custom_admin/adminprofile`,body)
  }

}
