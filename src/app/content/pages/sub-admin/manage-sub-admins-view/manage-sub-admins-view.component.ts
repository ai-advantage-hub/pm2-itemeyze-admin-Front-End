import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { SubAdminService } from 'src/app/content/core/services/sub-admin/sub-admin.service';

@Component({
  selector: 'app-manage-sub-admins-view',
  templateUrl: './manage-sub-admins-view.component.html',
  styleUrls: ['./manage-sub-admins-view.component.scss']
})
export class ManageSubAdminsViewComponent implements OnInit {
  deleteId: number;
  closeResult: string = '';
  id: number;
  data: any = [];
  role:number;
  @ViewChild('deleteUserModal') templateRefDeleteUser: TemplateRef<any>;
  @ViewChild('deactivateUserModal') templateRefDeactivateUser: TemplateRef<any>;

  constructor(private headerTitle: AppService, private modalService: NgbModal, private adminService: SubAdminService,
    private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.headerTitle.setTitle('Manage Sub Admins');
    this.getFromParams();
    this.getDetail();
  }
  getFromParams(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      this.role = params.role;
    });
  }
  getDetail() {
    this.adminService.viewSubAdmin(this.id).subscribe((result: any) => {
      if (result.status == 200) {
        this.data = result.data[0];
      }
    });
  }
  statusChange(value) {
    const body = {
      id: this.id,
      status_value: value
    }
    this.adminService.updateAdminStatus(body).subscribe((result: any) => {
      this.toastr.success(result.data.message);
      this.hideDeactivateUserModal();
      this.router.navigate(['/pages/manage-sub-admins']);
      // this.getDetail();

    });
  }
  deleteUser() {
    const body = {
      user_id: this.id
    }
    this.adminService.delete(body).subscribe((result: any) => {
      this.toastr.success(result.data.message);
      this.hideDeleteUserModal();
      this.router.navigate(['/pages/manage-sub-admins']);
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

  hideDeleteUserModal() {
    this.modalService.dismissAll();
    this.closeDeleteUserModal();
  }

  hideDeactivateUserModal() {
    this.modalService.dismissAll();
    this.closeDeactivateUserModal();
  }

  openDeleteUserModal() {
    this.open(this.templateRefDeleteUser);
  }

  closeDeleteUserModal() {
    const del = document.getElementById('deleteUserModal');
    if (del != null) {
      del.style.display = 'none';
    }
  }

  openDeactivateUserModal() {
    this.open(this.templateRefDeactivateUser);
  }

  closeDeactivateUserModal() {
    const del = document.getElementById('deactivateUserModal');
    if (del != null) {
      del.style.display = 'none';
    }
  }
  goToEdit(value) {
    this.router.navigate(['/pages/manage-sub-admins-add'], { queryParams: { id: this.id, role: value } });
  }

}
