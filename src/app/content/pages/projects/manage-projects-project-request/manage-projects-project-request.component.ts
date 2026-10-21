import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ManageProjectsService } from 'src/app/content/core/services/manage-projects/manage-projects.service';
import { ManageCompanyService } from 'src/app/content/core/services/manage-company/manage-company.service';
import { ManageUsersService } from 'src/app/content/core/services/manage-users/manage-users.service';


@Component({
  selector: 'app-manage-projects-project-request',
  templateUrl: './manage-projects-project-request.component.html',
  styleUrls: ['./manage-projects-project-request.component.scss']
})
export class ManageProjectsProjectRequestComponent implements OnInit {
  showModal = false;
  items: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  datePipe: DatePipe;
  approveProjectForm:FormGroup;
  closeResult :string = '';
  id:number;
  data:any= [];
  deleteId: number;
  deleteName: string;
  emailData: any = [];
  searchText: string = '';
  filteredData: any = [];
  selectedEmail: any = [];
  emailId:number;
  searchCompany:string='';
  companyArray: any = [];
  companyArr :any = [];
  selectedId:any=[];
  
  @ViewChild('approveModel') templateRef: TemplateRef<any>;
  @ViewChild('denyModal') templateRefDenyProject: TemplateRef<any>;


  constructor(private headerTitle: AppService,private projectService:ManageProjectsService,
    private fb: FormBuilder, private toastr: ToastrService, private router: Router,private modalService: NgbModal,
    private manageUserService:ManageUsersService, private companyService: ManageCompanyService) {
  }

  ngOnInit() {
    this.headerTitle.setTitle('Manage Projects');
    this.initForm();
    this.companyList();
    this.unapprovedList();
  }

  initForm(): void {
    this.approveProjectForm = this.fb.group(
      {
        project_name: ['', Validators.required],
        project_number: ['', Validators.required],
        assign_to: ["",Validators.pattern(environment.emailRegex)],
        site_name:[''],
        company_name:[""]

      });
  }


  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;

  }
  getShownEntriesRange(): string {
    const startRange = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endRange = Math.min(this.currentPage * this.itemsPerPage, this.items.length);
    return `${startRange} - ${endRange}`;
  }

  unapprovedList() {
    this.projectService.getUnapprovedProject().subscribe((result: any) => {
      if (result.status == 200) {
        this.items = result.data;
      }
    });
  }
  dateTransform(val) {
    return this.datePipe.transform(val, "MM-dd-yyyy");
  }

  approveProject() {
    const body = {
      "project_id" : this.id,
      "project_name" : this.approveProjectForm.value.project_name,
      "project_number" : this.approveProjectForm.value.project_number,
      "assigned_to" : this.selectedId,
      "status_value" : 1,
      "company_id" :  this.emailId ? this.emailId : "",
      "site_name" :  this.approveProjectForm.value.site_name ?  this.approveProjectForm.value.site_name : "",
    }
    this.projectService.approveProjectList(body).subscribe((result: any) => {
      this.toastr.success(result.data.message);
      this.hide();
    })
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

  hide() {
    this.modalService.dismissAll();
    this.approveProjectForm.reset();
    this.selectedId = [];
    this.selectedEmail = [];
    this.unapprovedList();
    
  }

  openapproveModel(id,data) {
   
    this.id = id;
    this.data = [data];
    
    this.approveProjectForm.patchValue({
      project_name: this.data[0].project_name,
      site_name: this.data[0].site_id__name,
    });
    this.open(this.templateRef);
  }

  rejectProject() {
    const body = {
      "project_id" : this.deleteId,
      "project_name" :  this.deleteName,
      "project_number" : "",
      "assigned_to" : "",
      "status_value" : 2
    }
    this.projectService.approveProjectList(body).subscribe((result: any) => {
      this.toastr.success(result.data.message);
      this.unapprovedList();
      this.hideDenyModal();
    })
  }

  openDenyModal(id, name) {
    this.deleteId = id;
    this.deleteName = name
    this.open(this.templateRefDenyProject);
  }

  hideDenyModal() {
    this.modalService.dismissAll();
    
  }

  onInputChange(event: any) {
    const inputValue = event.target.value;
    const regex = /^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/;
    if (!regex.test(inputValue)) {
      event.target.value = inputValue.replace(/[^0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+/g, '');
    }
  }

  search() {
    if (this.searchText == '') {
      this.filteredData = [];
      return;
    } else if(this.searchText.length > 1) {
      this.manageUserService.searchName(this.emailId,this.searchText,this.currentPage, this.itemsPerPage).subscribe((result: any) => {
        this.emailData = result.data.results;
        const assignedToControl = this.approveProjectForm.get('assign_to');
        const inputValue = this.searchText.toUpperCase();
        if (!this.emailData.some(item => item.email.toUpperCase().includes(inputValue)) && this.selectedEmail.every(item => item.toUpperCase() !== inputValue) || this.searchText != "") {
          assignedToControl.setErrors({ 'emailNotFound': true });
        } else {
          assignedToControl.setErrors(null); // Clear the error if email is found
        }
        this.filteredData = this.emailData.filter(item => item.email.toUpperCase().includes(this.searchText.toUpperCase()));
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
    this.approveProjectForm.controls['assign_to'].setValue('');
    this.approveProjectForm.get('assign_to').setErrors(null);
  }

  removeEmail(email) {
    const index = this.selectedEmail.filter(list => list != email);
    this.selectedEmail.splice(index, 1);
  }

  selectName(name, id) {
    this.emailId = id;
    this.searchCompany = name;
    this.companyArray = [];

  }

  onSearch() {
    if (this.searchCompany == "" ) {
      this.companyArray= [];
      return;
      } else if(this.searchCompany.length > 1) {
        this.companyService.search(this.searchCompany,"",this.currentPage,this.itemsPerPage).subscribe((result: any) => {
          this.companyArray = result.data.results;
          const assignedToControl = this.approveProjectForm.get('company_name');
          const inputValue = this.searchCompany.toUpperCase();
          if (!this.companyArray.some(item => item.name.toUpperCase().includes(inputValue))) {
            assignedToControl.setErrors({ 'companyNotFound': true });
          } else {
            assignedToControl.setErrors(null); // Clear the error if email is found
          }
        })
      }
  }

  companyList() {
    this.companyService.companyName().subscribe((res:any) => {
      this.companyArr = res.data;
    });
  }

  emailValue(event) {
    this.emailId =  event.id;
    this.selectedEmail = [];
    this.selectedId = [];
    this.approveProjectForm.controls['assign_to'].setValue('');
    this.emailSearch();
  }

  
  emailSearch() {
    this.manageUserService.searchName2(this.emailId).subscribe((res: any) => {
      this.data = res.data;
    });
  }

}
