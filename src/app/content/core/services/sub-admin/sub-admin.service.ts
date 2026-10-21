import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubAdminService {

  constructor(private httpService:AuthenticationService) { }

  searchSubAdmin(page:number,pageNo:number,is_active:string,name:string): Observable<any> {
    return this.httpService.get(`custom_admin/search_sub_admin?page=${page}&page_size=${pageNo}&is_active=${is_active}&query=${name}`,)
  }

  viewSubAdmin(id: number) {
    return this.httpService.get(`custom_admin/retrieve_sub_admin/${id}`)
  }

  updateAdminStatus(body:any) {
    return this.httpService.put(`custom_admin/subadmin_status`,body)
  }

  createSubAdmin(body:any){
    return this.httpService.post(`custom_admin/create_subadmin`, body)
  }
  editSubAdmin(id:number,body:any){
    return this.httpService.put(`custom_admin/edit_subadmin/${id}`, body)
  }

  delete(body:any){
    return this.httpService.put(`custom_admin/delete_subadmin`, body)
  }


}
