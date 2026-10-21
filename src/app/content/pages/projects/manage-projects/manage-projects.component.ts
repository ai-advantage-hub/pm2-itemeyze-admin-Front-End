import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ManageProjectsService } from 'src/app/content/core/services/manage-projects/manage-projects.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ManageCompanyService } from 'src/app/content/core/services/manage-company/manage-company.service';
import { ManageUsersService } from 'src/app/content/core/services/manage-users/manage-users.service';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.scss']
})
export class ManageProjectsComponent {
  items: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchProject: string = '';
  deleteId: number;
  noData: boolean = false;
  closeResult: string = '';
  count: number;
  totalPage: number;
  requestCount: number;
  filter: number = 0;
  searchField: FormControl = new FormControl('');
  search = "";
  EditProjectForm: FormGroup;
  companyArray: any = [];
  companyArr: any = [];
  searchText: string = '';
  filteredData: any = [];
  @ViewChild('deleteProjectModal') templateRefDeleteProject: TemplateRef<any>;
  @ViewChild('editModel') templateRef: TemplateRef<any>;
  assigners=[];
  selectedEmail: any = [];
  selectedId= [];
  project_details: any;
  created_by_admin: boolean;
  emails =[];
  ids = [];
  selectedData=[]
  ownership_to_admin: boolean;
  company_id: any;
  project_id: any;
  company_name: any;

  constructor(private headerTitle: AppService, private manageProjectsService: ManageProjectsService,
    private toastr: ToastrService, private router: Router, private modalService: NgbModal, private fb: FormBuilder, private companyService: ManageCompanyService, private manageUserService: ManageUsersService) { }

  ngOnInit() {
    // this.onSearch();
    this.initEditprojectform();
    this.companyList();
    this.projectlist(this.search, this.currentPage);
    this.headerTitle.setTitle('Manage Projects');
    this.closeDeleteModal();
    this.projectCount();
    this.searchField.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe((search) => {
      this.currentPage = 1;
      this.projectlist(search, this.currentPage);
    })
  }

  initEditprojectform() {
    this.EditProjectForm = this.fb.group({
      "project_name": ['', Validators.required],
      "project_number": ['', Validators.required],
      "company_name": ['', Validators.required],
      "assign_to": ['', Validators.required],
      "site_name": ['', Validators.required]
    })
  }

  onPageChange(pageNumber: number, search: string): void {
    this.currentPage = pageNumber;
    this.projectlist(search, this.currentPage);

  }
  getShownEntriesRange(): string {
    const startRange = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endRange = Math.min(this.currentPage * this.itemsPerPage, this.count);
    return `${startRange} - ${endRange}`;
  }

  closeDeleteModal() {
    const del = document.getElementById('deleteModal');
    if (del != null) {
      del.style.display = 'none';
    }
  }

  onSearch(searchField) {
    this.manageProjectsService.search(searchField, this.currentPage, this.itemsPerPage, this.filter).subscribe((result: any) => {
      this.items = result.data.results;
      this.count = result.data.count;
    })
  }

  projectlist(search, page) {
    this.manageProjectsService.search(search, page, this.itemsPerPage, this.filter).subscribe((result: any) => {
      this.items = result.data.results;
      this.count = result.data.count;
    })
  }

  deleteProjectName(search) {
    this.manageProjectsService.deleteProject(this.deleteId).subscribe((result: any) => {
      this.toastr.success(result.message);
      this.closeDeleteModal();
      this.onSearch(search)
      this.hideDeleteModal();

    })
  }

  viewProjectDetails(id) {
    this.router.navigate(['/pages/manage-projects-view-project'], { queryParams: { id: id } });
  }

  open(content): void {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'blur-backdrop',
      // backdrop: 'static',
      // keyboard: false
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  hideDeleteModal() {
    this.modalService.dismissAll();
    this.selectedId = [];
    this.selectedEmail = [];
    this.closeDeleteModal();
  }

  openDeleteModal(id) {
    this.deleteId = id;
    this.open(this.templateRefDeleteProject);
  }

  projectCount() {
    this.manageProjectsService.getProjectCount().subscribe((result: any) => {
      if (result.status == 200) {
        this.requestCount = result.data;
      }
    });
  }

  filterForStatus(search, event) {
    const value = event == "" ? "" : event;
    this.currentPage = 1;
    this.filter = value;
    this.onSearch(search);
  }

  openEditModel(project_id) {
    this.open(this.templateRef);
    this.ProjectDetails(project_id)
  }

  ProjectDetails(project_id) {
    this.project_id = project_id
    this.emails=[];
    this.ids=[]
    this.manageProjectsService.GetProjectDetails(project_id).subscribe((res: any) => {
      this.project_details = res.data;
      this.company_id = this.project_details.company_id
      this.company_name = this.project_details?.company_name
      this.project_details.project_users.forEach(user => {
        this.emails.push(user.email);
        this.ids.push(user.id);
      });
      this.created_by_admin = this.project_details?.created_by_admin
      this.ownership_to_admin = this.created_by_admin
      this.company_id = this.project_details?.company_id
      if (this.project_details.company_id != null) {
        this.emailSearch(this.project_details.company_id)
      }
      this.EditProjectForm.patchValue({
        "project_name": this.project_details?.project_name,
        "project_number": this.project_details?.project_number,
        "company_name": this.project_details?.company_name,
        "assign_to": this.ids,
        "site_name": this.project_details?.site_name
      })
    })
  }

  EditProject() {
    let body = {
      "project_name": this.EditProjectForm.value.project_name,
      // "project_name": this.project_details.project_name,
      "project_number": this.EditProjectForm.value.project_number,
      "company_name": this.company_name,
      "assigned_to": this.ids,
      "site_name": this.EditProjectForm.value.site_name,
      "company_id": this.company_id,
      "ownership_to_admin": this.ownership_to_admin
    }
    this.manageProjectsService.UpdateProject(this.project_id,body).subscribe((res:any)=>{
      if(res.status==200){
        this.projectlist(this.search, this.currentPage);
        this.toastr.success('Project updated successfully')
        this.hideDeleteModal()
      }
    })

  }

  selectData(data){
    if(!this.ids.includes(data.user_id)){
      this.ids.push(data.user_id)
      this.EditProjectForm.patchValue({
        "assign_to":this.ids
      })
      this.emails.push(data.user__email)
    }
    this.EditProjectForm.controls['assign_to'].setValue("")
  }


  companyList() {
    this.companyService.companyName().subscribe((res: any) => {
      this.companyArr = res.data;
    });
  }

  CompanySelection(event) {
    if(this.EditProjectForm.value.company_name==null){
      this.company_name=""
      this.company_id=""
    }
    if (event != null) {
      this.emailSearch(event.id)
      this.company_id = event.id
      this.company_name = event.name
    }
    this.emails = [];
    this.ids = [];
  }

  emailSearch(emailId) {
    this.manageUserService.searchName2(emailId).subscribe((res: any) => {
      this.assigners = res.data;
    });
  }

  removeIdAndEmail(i) {
    this.ids.splice(i, 1);
    this.emails.splice(i, 1);

}


  transferownership(ownership){
    this.ownership_to_admin = ownership.target.checked
  }

}
