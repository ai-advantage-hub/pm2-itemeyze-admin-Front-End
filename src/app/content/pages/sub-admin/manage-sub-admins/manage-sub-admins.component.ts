import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { SubAdminService } from 'src/app/content/core/services/sub-admin/sub-admin.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-manage-sub-admins',
  templateUrl: './manage-sub-admins.component.html',
  styleUrls: ['./manage-sub-admins.component.scss']
})
export class ManageSubAdminsComponent {
  items: any = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  data: any = [];
  searchCompany: string = '';
  filter: string = '';
  statusValue: number;
  count: number;
  role: number;
  searchField: FormControl = new FormControl('');
  search = "";

  constructor(private headerTitle: AppService, private adminService: SubAdminService,
    private toastr: ToastrService, private router: Router) {
  }

  ngOnInit() {
    this.headerTitle.setTitle('Manage Sub Admins');
    this.adminList(this.currentPage, this.search);
    this.searchField.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe((search) => {
      this.currentPage = 1;
      this.adminList(this.currentPage, search);
    })
  }

  onPageChange(pageNumber: number, search): void {
    this.currentPage = pageNumber;
    this.adminList(this.currentPage, search);

  }
  getShownEntriesRange(): string {
    const startRange = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endRange = Math.min(this.currentPage * this.itemsPerPage, this.count);
    return `${startRange} - ${endRange}`;
  }

  adminList(page, search) {
    this.adminService.searchSubAdmin(page, this.itemsPerPage, this.filter, search).subscribe((result: any) => {
      if (result.status == 200) {
        this.data = result.data.results;
        this.count = result.data.count;
      }
    });
  }

  filterForStatus(event, search) {
    const value = event == "" ? "" : event;
    this.currentPage = 1;
    this.filter = value;
    this.adminList(this.currentPage, search);
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
    this.adminService.updateAdminStatus(body).subscribe((res: any) => {
      this.toastr.success(res.data.message);
      this.adminList(this.currentPage, search);
    });
  }

  viewPage(id, status) {
    if (status) {
      this.role = 1;
    } else {
      this.role = 2;

    }
    this.router.navigate(['/pages/manage-sub-admins-view'], { queryParams: { id: id, role: this.role } });

  }
  goToAdd(value) {
    this.router.navigate(['/pages/manage-sub-admins-add'], { queryParams: { role: value } });
  }

}
