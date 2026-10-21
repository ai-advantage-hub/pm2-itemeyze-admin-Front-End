import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private httpService:AuthenticationService) { }

  searchUser(name:String,page:number,page_size:number,manufacturer_type:number): Observable<any> {
    return this.httpService.get(`custom_admin/manufacturer_list?name=${name}&page=${page}&page_size=${page_size}&manufacturer_type=${manufacturer_type}&is_active=True`,)
  }

  manufacturerDetail(id:number) {
    return this.httpService.get(`custom_admin/view_manufacturer/${id}`)
  }

  addManufacturer(body:any) {
    return this.httpService.post(`custom_admin/create_manufacturer`, body)
  }

  editManufacturer(body:any) {
    return this.httpService.put(`custom_admin/edit_manufacturer`, body)
  }

  delete(id:number){
    return this.httpService.delete(`custom_admin/delete_manufacturer?id=${id}`)
  }
}
