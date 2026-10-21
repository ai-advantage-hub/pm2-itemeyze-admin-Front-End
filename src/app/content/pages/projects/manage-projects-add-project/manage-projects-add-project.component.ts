import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ManageProjectsService } from 'src/app/content/core/services/manage-projects/manage-projects.service';
import { ManageCompanyService } from 'src/app/content/core/services/manage-company/manage-company.service';
import { ManageUsersService } from 'src/app/content/core/services/manage-users/manage-users.service';

@Component({
  selector: 'app-manage-projects-add-project',
  templateUrl: './manage-projects-add-project.component.html',
  styleUrls: ['./manage-projects-add-project.component.scss']
})
export class ManageProjectsAddProjectComponent implements OnInit {
  createNewProjectForm: FormGroup;
  data: any = [];
  searchText: string = '';
  filteredData: any = [];
  selectedEmail: any = [];
  id: number;
  searchCompany:string="";
  currentPage:number= 1;
  companyArray:any= [];
  itemsPerPage: number = 10;
  countries:any=[]
  selectedCity:string="";
  emailId:number;
  companyArr:any=[];
  emailArray:any=[];
  selectedId:any=[];
  


  constructor(private headerTitle: AppService, private manageProjectsService: ManageProjectsService,
    private fb: FormBuilder, private toastr: ToastrService, private router: Router, private manageUserService: ManageUsersService,
    private companyService: ManageCompanyService) {

  }

  ngOnInit(): void {
    this.initForm();
    this.companyList();
    this.headerTitle.setTitle('Manage Projects');
  }

  initForm(): void {
    this.createNewProjectForm = this.fb.group(
      {
        project_name: ['', Validators.required],
        project_number: ['', Validators.required],
        assigned_to: [null],
        site_name:[''],
        company_name:[null]
      });
  }

  createNewProject() {
    const body = {
      project_name: this.createNewProjectForm.controls.project_name.value,
      project_number: this.createNewProjectForm.controls.project_number.value,
      assigned_to:  this.selectedId,
      company_id : this.emailId ? this.emailId : "",
      site_name : this.createNewProjectForm.controls.site_name.value ?this.createNewProjectForm.controls.site_name.value :""
    }
    this.manageProjectsService.createProject(body).subscribe((result: any) => {
      this.toastr.success(result.data.message);
      this.selectedId =[];
      this.router.navigate(['/pages/manage-projects'])
    })
  }

  onInputChange(event: any) {
    const inputValue = event.target.value;
    const regex = /^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/;
    if (!regex.test(inputValue)) {
      event.target.value = inputValue.replace(/[^0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+/g, '');
    }
  }

  search() {
    if (this.searchText == "") {
      // this.filteredData = [];
      // return;
    } else if (this.searchText.length > 1){
      this.manageUserService.searchName(this.emailId,this.searchText,this.currentPage, this.itemsPerPage).subscribe((res: any) => {
        this.data = res.data.results;
        const assignedToControl = this.createNewProjectForm.get('assigned_to');
        const inputValue = this.searchText.toUpperCase();
        if (!this.data.some(item => item.email.toUpperCase().includes(inputValue)) && this.selectedEmail.every(item => item.email.toUpperCase() !== inputValue) || this.searchText != "") {
          assignedToControl.setErrors({ 'emailNotFound': true });
        } else {
          assignedToControl.setErrors(null); // Clear the error if email is found
        }
        this.filteredData = this.data.filter(item => item.email.toUpperCase().includes(this.searchText.toUpperCase()));
        for (let email of this.selectedEmail) {
          this.filteredData = this.filteredData.filter(item => item.id != email.id);
        }
      })
    }
  }

  selectData(selectedEmail): void {
    this.selectedEmail.push(selectedEmail.user__email);
    this.selectedId.push(selectedEmail.user_id)
    const unique = [...new Set( this.selectedEmail.map(item => item))];
    const unique2 = [...new Set( this.selectedId.map(item => item))];
    this.selectedEmail = unique;
    this.selectedId = unique2;
    this.filteredData = [];
    this.searchText = '';
    this.createNewProjectForm.controls['assigned_to'].setValue("");
    this.createNewProjectForm.get('assigned_to').setErrors(null);
  }
  selectName(name, id) {
    this.emailId = id;
    this.searchCompany = name;
    this.companyArray = [];

  }

  removeEmail(email) {
    const index = this.selectedEmail.findIndex((list) => list == email); //Find the index of stored id
      this.selectedEmail.splice(index, 1);
    // this.selectedEmail = this.selectedEmail.filter(email => email.email != emailRemove.email);
  }

  // onSearch() {
  //   if (this.searchCompany == ""  || this.createNewProjectForm.controls.company_name.value === '') {
  //       this.companyArray= [];
  //       return;
  //     }else if(this.searchCompany.length > 1) {
  //       this.companyService.search(this.searchCompany,"",this.currentPage,this.itemsPerPage).subscribe((result: any) => {
  //         this.companyArray = result.data.results;
  //         const assignedToControl = this.createNewProjectForm.get('company_name');
  //         const inputValue = this.searchCompany.toUpperCase();
  //         if (!this.companyArray.some(item => item.name.toUpperCase().includes(inputValue))) {
  //           assignedToControl.setErrors({ 'companyNotFound': true });
  //         } else {
  //           assignedToControl.setErrors(null); // Clear the error if email is found
  //         }
       
  //       })
  //     }
  // }

  companyList() {
    this.companyService.companyName().subscribe((res:any) => {
      this.companyArr = res.data;
    });
  }

  emailValue(event) {
    this.emailId =  event.id;
    this.selectedEmail = [];
    this.selectedId = [];
    this.createNewProjectForm.controls['assigned_to'].setValue("");
    this.emailSearch();
  }

  
  emailSearch() {
    this.manageUserService.searchName2(this.emailId).subscribe((res: any) => {
      this.data = res.data;
    });
  }

}
