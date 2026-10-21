import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ManageCompanyService {

  constructor(private httpService:AuthenticationService) { }

  getCompany(): Observable<any> {
    return this.httpService.get(`custom_admin/company`);
  }
  addCompany(body:any){
    return this.httpService.post(`custom_admin/company`, body)
  }

  editCompany(body:any) {
    return this.httpService.put(`custom_admin/company`, body)
  }

  deleteCompany(id:number) {
    return this.httpService.delete(`custom_admin/company?id=${id}`)
    
  }

  updateUserStatus(body:any) {
    return this.httpService.put(`custom_admin/company_status`,body)
  }

  search(name:string,is_active:string,page:number,pageNo:number): Observable<any> {
    return this.httpService.get(`custom_admin/company?company_name=${name}&is_active=${is_active}&page=${page}&page_size=${pageNo}`,)
  }

  companyName() {
    return this.httpService.get(`custom_admin/company_list`)
  }
}
