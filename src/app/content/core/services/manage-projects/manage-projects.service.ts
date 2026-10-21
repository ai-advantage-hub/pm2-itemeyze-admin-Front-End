import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManageProjectsService {
  constructor(private httpService: AuthenticationService) {}

  search(
    project_name: string,
    page: number,
    pageNo: number,
    project_type: number
  ): Observable<any> {
    return this.httpService.get(
      `custom_admin/project_list?name=${project_name}&page=${page}&page_size=${pageNo}&project_type=${project_type}`
    );
  }

  getUserList(id: number): Observable<any> {
    return this.httpService.get(`custom_admin/project_users/${id}`);
  }

  deleteProject(id: number) {
    return this.httpService.delete(`custom_admin/delete_project/${id}`);
  }

  createProject(body: any) {
    return this.httpService.post(`custom_admin/project_create`, body);
  }

  viewProject(id: number): Observable<any> {
    return this.httpService.get(`custom_admin/project_details/${id}`);
  }
  getUnapprovedProject(): Observable<any> {
    return this.httpService.get(`custom_admin/un_approved_project`);
  }

  approveProjectList(body: any) {
    return this.httpService.put(`custom_admin/project_approve`, body);
  }
  deleteapprovedFiles(id: number) {
    return this.httpService.delete(`custom_admin/destroy_file/${id}`);
  }

  unapprovedFileList(id: number): Observable<any> {
    return this.httpService.get(`custom_admin/un_approved_file/${id}`);
  }

  approveFiles(body: any) {
    return this.httpService.put(`custom_admin/approve_file`, body);
  }
  // fileDetails(id:number){
  //   return this.httpService.get(`custom_admin/view_file/${id}`);
  // }

  downloadFile(id: number, body) {
    // return this.httpService.get(`custom_admin/project/${id}/download_csv/`);
    return this.httpService.post(`custom_admin/project/${id}/download_selected_csv/`,body);

  }

  getFileDetail(id: number) {
    return this.httpService.get(`custom_admin/view_file/${id}`);
  }

  addFile(body) {
    return this.httpService.post(`custom_admin/create_file_admin`, body);
  }

  updateFile(id: number, body) {
    return this.httpService.put(`custom_admin/update_file/${id}`, body);
  }

  getProjectCount() {
    return this.httpService.get(`custom_admin/un_approved_project_count`);
  }

  getFileCount(id: number) {
    return this.httpService.get(`custom_admin/un_approved_files_count/${id}`);
  }

  deletedProjects(page: number, pageNo: number): Observable<any> {
    return this.httpService.get(
      `custom_admin/list_deleted_projects?page=${page}&page_size=${pageNo}`
    );
  }

  restoreDeletedProject(id: number, body) {
    return this.httpService.put(`custom_admin/restore_project/${id}`, body);
  }

  listDeleteFiles(id: number, pageNo: number, page: number) {
    return this.httpService.get(
      `custom_admin/list_deleted_files/${id}?page_size=${pageNo}&page=${page}`
    );
  }

  dissapproveList(id: number, page: number, pageNo: number) {
    return this.httpService.get(
      `custom_admin/list_disapproved_file/${id}?page=${page}&page_size=${pageNo}`
    );
  }

  approveDissFile(body: any) {
    return this.httpService.put(`custom_admin/approve`, body);
  }

  viewDisapproveFile(id: number) {
    return this.httpService.get(`custom_admin/view_disapproved_file/${id}`);
  }

  viewMarkedList(id: number, page: number, page_size: number) {
    return this.httpService.get(
      `custom_admin/marked_for_delete_files/${id}?page=${page}&page_size=${page_size}`
    );
  }

  markeApproveFile(body: any) {
    return this.httpService.put(
      `custom_admin/approve_marked_for_deleted_file`,
      body
    );
  }

  restoreFile(body: any) {
    return this.httpService.put(`custom_admin/restore_files`, body);
  }

  disapproveFile(body) {
    return this.httpService.put(`custom_admin/disapprove_file`, body);
  }

  maufacturerName() {
    return this.httpService.get(`custom_admin/manufacturer_listing`);
  }

  approveFile(
    id: number,
    page: number,
    page_size: number,
    search: string,
    start_date: string,
    end_date: string
  ) {
    return this.httpService.get(
      `custom_admin/approved_files_list/${id}?page=${page}&page_size=${page_size}&search=${search}&start_date=${start_date}&end_date=${end_date}`
    );
  }
  newApproveFile(
    id: number,
    search: string,
    start_date: string,
    end_date: string
  ) {
    return this.httpService.get(
      `custom_admin/approved_files_list/${id}?search=${search}&start_date=${start_date}&end_date=${end_date}`
    );
  }

  GetProjectDetails(project_id) {
    return this.httpService.get(`custom_admin/project_view/${project_id}`);
  }

  UpdateProject(project_id, body: any) {
    return this.httpService.put(
      `custom_admin/project_update/${project_id}`,
      body
    );
  }

  GetProjectImages(project_id) {
    return this.httpService.getZip(`custom_admin/download_files/${project_id}`);
  }

  GetSelectedProjectImages(project_id, lists) {
    return this.httpService.getDownloadImages(
      `custom_admin/download_selected_files/${project_id}`,
      lists
    );
  }

  //new image zip download
  GetProjectImagesNew(project_id) {
    return this.httpService.get(
      `custom_admin/download_files_background/${project_id}`
    );
  }
}
