import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ManageUsersService } from 'src/app/content/core/services/manage-users/manage-users.service';
import { ManageCompanyService } from 'src/app/content/core/services/manage-company/manage-company.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {
  items: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchUser: string = '';
  filter: string = '';
  statusValue: number;
  count: number;
  requestCount: number;
  role: number;
  closeResult: string = '';
  userId: number;
  editForm: FormGroup;
  user_company__company__name: string;
  company_name: string;
  full_name: string;
  companyArray: any = [];
  emailId: number;
  searchCompany: string = "";
  searchField: FormControl = new FormControl('');
  search: string = '';
  companyArr:any=[];
  @ViewChild('editModal') templateRef: TemplateRef<any>;
  adminRole:number;
  module: any =[];
  show:boolean;

  constructor(private headerTitle: AppService, private userService: ManageUsersService,
    private toastr: ToastrService, private router: Router, private fb: FormBuilder,
    private modalService: NgbModal, private companyService:ManageCompanyService) { }

  ngOnInit() {
    this.headerTitle.setTitle('Manage Users');
    this.usersList(this.currentPage,this.search);
    this.companyList();
    this.usersCount();
    this.initEditForm();
    this.searchField.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe((search) => {
      this.currentPage=1;
      this.usersList(this.currentPage,search);
    })
  }

  initEditForm(): void {
    this.editForm = this.fb.group(
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

  onPageChange(pageNumber: number,search): void {
    this.currentPage = pageNumber;
    this.usersList(this.currentPage,search);

  }
  getShownEntriesRange(): string {
    const startRange = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endRange = Math.min(this.currentPage * this.itemsPerPage, this.count);
    return `${startRange} - ${endRange}`;
  }

  usersList(page,search) {
    // if (this.searchUser != "") {
    //   this.currentPage = 1;

    // }
    this.userService.searchUser(page, this.itemsPerPage, this.filter, search).subscribe((result: any) => {
      if (result.status == 200) {
        this.items = result.data.results;
        this.count = result.data.count;
      }
    });
  }

  filterForStatus(event,search) {
    const value = event == "" ? "" : event;
    this.currentPage = 1;
    this.filter = value;
    this.usersList(this.currentPage,search);
  }

  changeStatus(id, status) {
    if (status) {
      this.statusValue = 2;
    } else {
      this.statusValue = 1;
    }
    const body = {
      "user_id": id,
      "status_value": this.statusValue
    }
    this.userService.updateUserStatus(body).subscribe((res: any) => {
      this.toastr.success(res.data.message);
      this.usersList(this.currentPage,this.search);
    });
  }

  viewPage(id, status) {
    if (status) {
      this.role = 1;
    } else {
      this.role = 2;

    }
    this.router.navigate(['/pages/manage-users-view-profile'], { queryParams: { id: id, role: this.role } });

  }

  usersCount() {
    this.userService.getUsersCount().subscribe((result: any) => {
      if (result.status == 200) {
        this.requestCount = result.data;
      }
    });
  }

  // editUser(){
  //   const body = {
  //     "user_id" :this.userId,
  //     "status_value" : 1,
  //     "new_company" : this.editForm.controls.company_name.value
  //   }
  //   this.userService.editUser(body).subscribe((result: any) => {
  //   this.toastr.success(result.data.message);
  //    this.hide();
  //   this.usersList();
  //   });
  // }

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

  openEditModal(username, companyname, id) {
    this.userId = id;
    this.full_name = username;
    this.searchCompany = companyname;
    this.editForm.controls['company_name'].setValue(companyname)
    this.editForm.patchValue({ user_name: this.full_name })
    this.open(this.templateRef);
  }

  hide() {
    this.modalService.dismissAll();
    this.editForm.reset();
  }

  UserEdit() {
    const body = {
      "company": this.editForm.controls.company_name.value
    }

    this.userService.editUser(this.userId, body).subscribe((res: any) => {
      this.toastr.success(res.data.message);
      this.hide();
      this.usersList(this.currentPage,this.search);
    })
  }

  companyList() {
    this.companyService.companyName().subscribe((res:any) => {
      this.companyArr = res.data;
    });
  }
  

}
