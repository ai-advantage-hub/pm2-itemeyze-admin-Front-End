import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  constructor(private httpService:AuthenticationService) { }

  searchName(id:number,name:string,page:number,page_size:number) {
    return this.httpService.get(`custom_admin/users_list_of_company/${id}?name=${name}&page=${page}&page_size=${page_size}`)
  }
  searchName2(id:number) {
    return this.httpService.get(`custom_admin/users_list_of_company/${id}`)
  }
  searchUser(page:number,pageNo:number,is_active:string,name:string): Observable<any> {
    return this.httpService.get(`custom_admin/manage_user_list?page=${page}&page_size=${pageNo}&is_active=${is_active}&name=${name}`,)
  }

  updateUserStatus(body:any) {
    return this.httpService.put(`custom_admin/change_status`,body)
  }

  viewUser(id: number): Observable<any> {
    return this.httpService.get(`custom_admin/user_details/${id}`)
  }

  getUnapprovedUsers(request_type:number,page:number,pageNo:number): Observable<any> {
    return this.httpService.get(`custom_admin/unapproved_users_list?request_type=${request_type}&page=${page}&page_size=${pageNo}`);
  }

  approveOrDenyUser(body:any) {
    return this.httpService.put(`custom_admin/approve_requested_user`,body)
  }

  userProjects(id: number): Observable<any> {
    return this.httpService.get(`custom_admin/project_list/${id}`)
  }

  getUsersCount() {
    return this.httpService.get(`custom_admin/unapproved_users_count`)
  }

  deleteUserAdmin(id:number) {
    return this.httpService.delete(`custom_admin/delete_user_admin/${id}`)  
  }

  viewProject(id: number): Observable<any> {
    return this.httpService.get(`custom_admin/retrieve_user_project/${id}`)
  }

  exportFile(id:number){
    return this.httpService.get(`custom_admin/admin_user_csv/${id}/download_csv/`);
  }

  deleteFile(id:number) {
    return this.httpService.delete(`custom_admin/delete_file_user/${id}`)  
  }

  graphData(id:number,project_id:number,year:number,month:number){
    return this.httpService.get(`custom_admin/project_graph/${id}?selected_project_id=${project_id}&year=${year}&month=${month}`);
  }

  removeUser(user_id:number,project_id:number){
    return this.httpService.delete(`custom_admin/project/remove-user/?user_id=${user_id}&project_id=${project_id}`)  
  }

  editUser(id:number, body:object) {
    return this.httpService.put(`custom_admin/edit_user_details/${id}`, body)
  }
}
