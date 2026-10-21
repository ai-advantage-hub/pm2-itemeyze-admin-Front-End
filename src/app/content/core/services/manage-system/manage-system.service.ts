import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageSystemService {

  constructor(private httpService: AuthenticationService) { }

  //getting the version information
  getVersion(): Observable<any> {
    return this.httpService.get(`custom_admin/get_versions`);
  }

  //updating version information
  updateVersion(body): Observable<any> {
    return this.httpService.post(`custom_admin/update_versions`, body);
  }
}
