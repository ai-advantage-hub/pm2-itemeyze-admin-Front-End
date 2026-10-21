import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpService:AuthenticationService) { }

  getDashboardData(month:string, year): Observable<any> {
    return this.httpService.get(`custom_admin/admin_dashboard?month=${month}&year=${year}`);
  }
}
