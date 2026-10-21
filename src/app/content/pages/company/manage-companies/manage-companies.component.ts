import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ManageCompanyService } from 'src/app/content/core/services/manage-company/manage-company.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-manage-companies',
  templateUrl: './manage-companies.component.html',
  styleUrls: ['./manage-companies.component.scss']
})
export class ManageCompaniesComponent {
  items: any = [];
  currentPage = 1;
  itemsPerPage = 10;
  companyTitle: string = '';
  userStatus: boolean = false;
  searchCompany: string = '';
  addCompanyForm: FormGroup;
  editCompanyForm: FormGroup;
  deleteId: number;
  companyId: number;
  statusValue: number;
  closeResult: string = '';
  id: number;
  filter: string = '';
  count: number;
  pageValue: number;
  searchField: FormControl = new FormControl('');
  search = "";
  @ViewChild('addNewCompanyModal') templateRefAddCompany: TemplateRef<any>;
  @ViewChild('editCompanyModal') templateRefEditCompany: TemplateRef<any>;
  @ViewChild('deleteCompanyModal') templateRefDeleteCompany: TemplateRef<any>;
  constructor(private headerTitle: AppService, private manageCompaniesService: ManageCompanyService, private router: Router, private active: ActivatedRoute,
    private toastr: ToastrService, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    this.onSearch(this.currentPage, this.search);
    this.initForm();
    this.initEditForm();
    this.headerTitle.setTitle('Manage Companies');
    this.hideEditModal();
    this.closeDeleteModal();
    this.searchField.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe((search) => {
      this.currentPage = 1;
      this.onSearch(this.currentPage, search);
    })
  }
  initForm(): void {
    this.addCompanyForm = this.fb.group(
      {
        company_title: ['', Validators.required],
      });
  }
  initEditForm(): void {
    this.editCompanyForm = this.fb.group(
      {
        company_title: ['', Validators.required],
      });
  }

  closeAddNewCompanyModal() {
    const modalDiv = document.getElementById('addNewCompanyModal');
    this.addCompanyForm.reset();
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }

  closeEditModal() {
    const edit = document.getElementById('editModal');
    this.editCompanyForm.reset();
    if (edit != null) {
      edit.style.display = 'none';
    }
  }

  closeDeleteModal() {
    const del = document.getElementById('deleteModal');
    if (del != null) {
      del.style.display = 'none';
    }
  }

  onPageChange(pageNumber: number, search: any): void {
    this.currentPage = pageNumber;
    this.onSearch(this.currentPage, search);

  }
  getShownEntriesRange(): string {
    const startRange = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endRange = Math.min(this.currentPage * this.itemsPerPage, this.count);
    return `${startRange} - ${endRange}`;
  }


  addNewCompany() {
    this.manageCompaniesService.addCompany(this.addCompanyForm.value).subscribe((result: any) => {
      this.toastr.success(result.data.message);
      // this.onSearch();
      this.hideAddModal();
      this.searchCompany = '';
      this.filter = '';
      this.onSearch(this.currentPage, this.search);
    })
  }

  editCompanyName() {
    const body = {
      "id": this.companyId,
      "company_title": this.editCompanyForm.value.company_title
    }
    this.manageCompaniesService.editCompany(body).subscribe((result: any) => {
      this.toastr.success(result.data.message);
      this.closeEditModal();
      this.hideEditModal();
      this.onSearch(this.currentPage, this.search);
      // this.searchCompany = '';
      this.filter = '';
    })
  }

  deleteCompanyName() {
    this.manageCompaniesService.deleteCompany(this.deleteId).subscribe((result: any) => {
      this.toastr.success(result.data.message);
      this.closeDeleteModal();
      this.onSearch(this.currentPage, this.search);
      this.hideDeleteModal();
    })
  }

  changeStatus(id, status, search) {
    if (status) {
      this.statusValue = 2;
    } else {
      this.statusValue = 1;
    }
    const body = {
      "id": id,
      "status_value": this.statusValue
    }
    this.manageCompaniesService.updateUserStatus(body).subscribe((res: any) => {
      this.toastr.success(res.data.message);
      this.onSearch(this.currentPage, search);
    });

  }

  onSearch(page, search) {
    // if (this.searchCompany!= "" ) {
    //     this.currentPage = 1;
    //   }
    this.manageCompaniesService.search(search, this.filter, page, this.itemsPerPage).subscribe((result: any) => {
      this.items = result.data.results;
      this.count = result.data.count;
    })
  }

  filterForStatus(event, search) {
    const value = event == "" ? "" : event;
    this.currentPage = 1;
    this.filter = value;
    this.onSearch(this.currentPage, search);
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

  hideAddModal() {
    this.modalService.dismissAll();
    this.addCompanyForm.reset();
  }

  hideEditModal() {
    this.modalService.dismissAll();
    this.editCompanyForm.reset();
    this.closeEditModal();
  }

  hideDeleteModal() {
    this.modalService.dismissAll();
    this.closeDeleteModal();
  }

  openAddCompanyModel() {
    this.open(this.templateRefAddCompany);
  }

  openEditModal(name: string, id) {
    this.companyTitle = name;
    this.companyId = id;
    this.editCompanyForm.patchValue({ company_title: this.companyTitle })
    this.open(this.templateRefEditCompany);
  }

  openDeleteModal(id) {
    this.deleteId = id;
    this.open(this.templateRefDeleteCompany);
  }

}
