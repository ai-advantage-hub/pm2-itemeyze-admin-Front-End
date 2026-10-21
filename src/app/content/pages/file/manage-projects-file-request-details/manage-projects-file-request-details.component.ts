import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ManageProjectsService } from 'src/app/content/core/services/manage-projects/manage-projects.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-projects-file-request-details',
  templateUrl: './manage-projects-file-request-details.component.html',
  styleUrls: ['./manage-projects-file-request-details.component.scss'],
})
export class ManageProjectsFileRequestDetailsComponent implements OnInit {
  data: any = [];
  id: number;
  fileId: number;
  role: number;
  closeResult: string = '';
  deleteId: number;
  playlist: any = [];
  recordName: String;
  commentForm: FormGroup;
  searchInput$: Observable<string>;
  @ViewChild('deleteFileModal') templateRefDeleteFile: TemplateRef<any>;
  @ViewChild('disapproveFileModal') templateRefDisapproveFile: TemplateRef<any>;
  @ViewChild('restoreModal') templateRefRestoreProject: TemplateRef<any>;
  userArray: any;

  constructor(
    private headerTitle: AppService,
    private projectService: ManageProjectsService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: AppService,
    private _location: Location,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.headerTitle.setTitle('Manage Projects');
    this.initForm();
    this.getFromParams();
    this.fileDetail();
    this.getUsersList();
  }

  getFromParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.fileId = params.fileId;
      this.id = params.id;
      this.role = params.role;
    });
  }
  initForm(): void {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
      userId: ['', Validators.required],
    });
  }

  getUsersList() {
    this.projectService.getUserList(this.id).subscribe((result: any) => {
      this.userArray = result.data.users;
      // this.commentForm.patchValue({ userId: this.data.created_by });
    });
  }

  fileDetail() {
    if (!this.fileId) {
      return;
    }
    if (this.role == 1 || this.role == 2 || this.role == 4) {
      this.projectService
        .getFileDetail(this.fileId)
        .subscribe((result: any) => {
          if (result.status == 200) {
            this.data = result.data[0];
            const parts = this.data?.recording.split('/');
            const desiredPart = parts[parts.length - 1];
            this.recordName = desiredPart.substring(10);
            this.playlist = [
              {
                title: this.recordName,
                link: this.data?.recording,
              },
            ];
          }
        });
    } else {
      this.projectService
        .viewDisapproveFile(this.fileId)
        .subscribe((result: any) => {
          if (result.status == 200) {
            this.data = result.data[0];
            const parts = this.data?.recording.split('/');
            const desiredPart = parts[parts.length - 1];
            this.recordName = desiredPart.substring(10);
            this.playlist = [
              {
                title: this.recordName,
                link: this.data?.recording,
              },
            ];
          }
        });
    }
  }

  approveFiles(status, id) {
    const body = {
      file_id: Number(this.fileId),
      status_value: status,
    };
    this.projectService.approveFiles(body).subscribe((result: any) => {
      this.toastr.success(result.data.message);
      this.back();
    });
  }
  disapproveFiles(status) {
    const body = {
      file_id: Number(this.fileId),
      status_value: status,
    };
    this.projectService.approveDissFile(body).subscribe((result: any) => {
      this.toastr.success(result.data.message);
      this.hideDeleteFileModal();
      this._location.back();
    });
  }

  back() {
    this._location.back();
    // this.router.navigate(['/pages/manage-projects-file-request'], { queryParams: { id: this.id } });
  }

  imagePath(imgUrl): string {
    if (imgUrl == '' || imgUrl == null) {
      return 'assets/images/default-img.svg';
    } else {
      const parts = imgUrl.split('/');
      const desiredPart = 'image/' + parts[parts.length - 1];
      const part2 = desiredPart.split('?');
      return this.commonService.imagePath(part2[0]);
    }
  }
  goToeditFile() {
    this.router.navigate(['/pages/manage-projects-add-file'], {
      queryParams: { id: this.id, role: 2, fileId: this.fileId },
    });
  }

  deleteFiles() {
    this.projectService
      .deleteapprovedFiles(this.fileId)
      .subscribe((result: any) => {
        this.toastr.success(result.data.message);
        this.hideDeleteFileModal();
        this.router.navigate(['/pages/manage-projects-view-project'], {
          queryParams: { id: this.id },
        });
      });
  }

  open(content): void {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdropClass: 'blur-backdrop',
        // backdrop: 'static',
        // keyboard: false
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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

  hideDeleteFileModal() {
    this.modalService.dismissAll();
  }
  openDeleteFileModal(id) {
    this.deleteId = id;
    this.open(this.templateRefDeleteFile);
  }

  hideDisapproveFileModal() {
    this.modalService.dismissAll();
  }
  openDisapproveFileModal() {
    this.open(this.templateRefDisapproveFile);
  }

  disapproveStatus() {
    const body = {
      file_id: this.fileId,
      status_value: 1,
      user_id: this.commentForm.controls.userId.value,
      disapprove_reason: this.commentForm.controls.comment.value,
    };
    this.projectService.disapproveFile(body).subscribe((res: any) => {
      this.toastr.success(res.data.message);
      this.hideDisapproveFileModal();
      this.commentForm.reset();
      this.back();
    });
  }

  openRestoreModal() {
    this.open(this.templateRefRestoreProject);
  }
  hideRestoreModal() {
    this.modalService.dismissAll();
  }
  restoreDeleteFiles() {
    const body = {
      file_id: [this.fileId],
    };
    this.projectService.restoreFile(body).subscribe((res: any) => {
      this.toastr.success(res.data.Message);
      this.hideRestoreModal();
      this.router.navigate(['/pages/manage-projects-deleted-files/'], {
        queryParams: { id: this.id },
      });
    });
  }

  GotoEdit(fileId, id, role) {
    
    this.router.navigate(['/pages/manage-projects-deleted-files-edit'], {
      queryParams: { id: fileId, role: role, projectId: id },
    });
    // this.router.navigate(['/pages/manage-projects-deleted-files-edit']",qua:{ id: i?.id,role:2,projectId:projectId})
  }
}
