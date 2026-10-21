import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ManageUsersService } from 'src/app/content/core/services/manage-users/manage-users.service';
import { ManageCompanyService } from 'src/app/content/core/services/manage-company/manage-company.service';

@Component({
  selector: 'app-manage-users-request',
  templateUrl: './manage-users-request.component.html',
  styleUrls: ['./manage-users-request.component.scss']
})
export class ManageUsersRequestComponent implements OnInit {
  items: any = [];
  currentPage = 1;
  itemsPerPage = 10;
  count: number;
  id: number;
  statusValue:number;
  closeResult :string = '';
  userId:number;
  approveForm: FormGroup;
  user_company__company__name: string;
  company_name: string;
  full_name: string;
  filter:number= 0;
  companyArray:any= [];
  emailId:number;
  searchCompany:string="";
  companyArr:any = [];
  @ViewChild('approveModel') templateRef: TemplateRef<any>;
  @ViewChild('denyModal') templateRefDenyProject: TemplateRef<any>;

  constructor(private commonService: AppService, private userService:ManageUsersService,
    private route: ActivatedRoute, private toastr: ToastrService, private modalService: NgbModal,
    private fb: FormBuilder, private companyService:ManageCompanyService) {}

  ngOnInit(): void {
    this.commonService.setTitle('Manage Users');
    this.companyList();
    this.unapprovedList();
    this.initApproveForm();
  }

  initApproveForm(): void {
    this.approveForm = this.fb.group(
      {
        user_name: ['', Validators.required],
        company_name: ['', Validators.required],
      });
  }

  selectName(name, id) {
    this.emailId = id;
    this.searchCompany = name;
    this.companyArray = [];
  }

  // onSearch() {
  //   if (this.searchCompany == ""  || this.approveForm.controls.company_name.value === '') {
  //       this.companyArray= [];
  //       return;
  //     }else if(this.searchCompany.length > 1) {
  //       this.companyService.search(this.searchCompany,"",this.currentPage,this.itemsPerPage).subscribe((result: any) => {
  //         this.companyArray = result.data.results;
  //         const assignedToControl = this.approveForm.get('company_name');
  //         const inputValue = this.searchCompany.toUpperCase();
  //         if (!this.companyArray.some(item => item.name.toUpperCase().includes(inputValue))) {
  //           assignedToControl.setErrors({ 'companyNotFound': true });
  //         } else {
  //           assignedToControl.setErrors(null); // Clear the error if email is found
  //         }
       
  //       })
  //     }
  // }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.unapprovedList();

  }
  getShownEntriesRange(): string {
    const startRange = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endRange = Math.min(this.currentPage * this.itemsPerPage, this.count);
    return `${startRange} - ${endRange}`;
  }

  imagePath(imgUrl): string {
    if(imgUrl == '' || imgUrl == null){
      return 'assets/images/dummyuser-image.svg'
    }
    else{
      const parts = imgUrl.split('/');
      const desiredPart = 'image/' + parts[parts.length - 1];
      const part2 = desiredPart.split('?');
      return this.commonService.imagePath(part2[0]);
    }
  }

  filterForStatus(event){
    // const value = event == "" ? "" : event;
    this.currentPage = 1;
    this.filter =event;
    this.unapprovedList();
  }

  unapprovedList() {
    this.userService.getUnapprovedUsers(this.filter, this.currentPage, this.itemsPerPage).subscribe((result: any) => {
      if (result.status == 200) {
        this.items = result.data.results;
        this.count= result.data.count;
      }
    });
  }

  denyUser(status) {
    if (status) {
      this.statusValue = 2;
    } else {
      this.statusValue = 1;
    }
    const body = {
      "user_id":  this.userId,
      "status_value": this.statusValue
    }
    this.userService.approveOrDenyUser(body).subscribe((result: any) => {
      this.toastr.success(result.data.message);
      this.hideDenyModal();
      this.unapprovedList();
    });
  }
  approveUser(){
    const body = {
      "user_id" :this.userId,
      "status_value" : 1,
      "new_company" : this.approveForm.controls.company_name.value
    }
    this.userService.approveOrDenyUser(body).subscribe((result: any) => {
    this.toastr.success(result.data.message);
     this.hide();
    this.unapprovedList();
    });
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

  openApproveModal(username, companyname, id) {
    this.userId = id;
    this.full_name = username;
    this.searchCompany = companyname;
    this.approveForm.controls['company_name'].setValue(this.searchCompany)
    this.approveForm.patchValue({ user_name: this.full_name, company_name: this.user_company__company__name })
    this.open(this.templateRef);
    }

  hide() {
    this.modalService.dismissAll();
    this.approveForm.reset();
  }

  openDenyModal(id) {
    this.userId = id;
    this.open(this.templateRefDenyProject);
  }

  hideDenyModal() {
    this.modalService.dismissAll();
    
  }

  // onSearch() {
  //   if (this.searchCompany == ""  || this.approveForm.controls.company_name.value === '') {
  //       this.companyArray= [];
  //       return;
  //     }else if(this.searchCompany.length > 1) {
  //       this.companyService.search(this.searchCompany,"",this.currentPage,this.itemsPerPage).subscribe((result: any) => {
  //         this.companyArray = result.data.results;
  //         const assignedToControl = this.approveForm.get('company_name');
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


}
