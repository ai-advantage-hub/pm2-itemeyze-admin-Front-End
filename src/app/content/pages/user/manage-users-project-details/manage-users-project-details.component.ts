import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ManageUsersService } from 'src/app/content/core/services/manage-users/manage-users.service';
import { ManageProjectsService } from 'src/app/content/core/services/manage-projects/manage-projects.service';

@Component({
  selector: 'app-manage-users-project-details',
  templateUrl: './manage-users-project-details.component.html',
  styleUrls: ['./manage-users-project-details.component.scss']
})
export class ManageUsersProjectDetailsComponent implements OnInit {
  items: any = [];
  currentPage = 1;
  itemsPerPage = 10;
  closeResult: string = '';
  id: number;
  files: any = [];
  downloadUrl: string;
  fileId: number;
  userId: number;
  role:number;
  data:any = [];
  @ViewChild('deleteFileModal') templateRefDeleteFile: TemplateRef<any>;
  @ViewChild('removeUserModal') templateRefRemoveUser: TemplateRef<any>;
  show: boolean;
  filesId:any=[]

  constructor(private headerTitle: AppService, private modalService: NgbModal, private userService: ManageUsersService,
    private route: ActivatedRoute, private commonService: AppService, private router: Router,
    private _location: Location, private toastr: ToastrService,private manageProjectsService: ManageProjectsService) { }

  ngOnInit(): void {
    this.role=  JSON.parse(localStorage.getItem('role'));
    this.data =  JSON.parse(localStorage.getItem('modules') || "[]");
    this.headerTitle.setTitle('Manage Users');
    this.getFromParams();
    this.viewProjectDetails();
    // this.closeDeleteFileModal();
  }

  getFromParams(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      this.userId = params.userId;
    });
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;

  }
  getShownEntriesRange(): string {
    const startRange = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endRange = Math.min(this.currentPage * this.itemsPerPage, this.files.length);
    return `${startRange} - ${endRange}`;
  }

  viewProjectDetails() {
    this.userService.viewProject(this.id).subscribe((result: any) => {
      if (result.status == 200) {
        this.items = result.data;
        this.files = result.data.files;
      }
    });
  }

  fileExport() {    
    // this.userService.exportFile(this.id).subscribe((result: any) => {
    //   this.downloadUrl = result.data.file_path;
    //   window.open(this.commonService.csvPath(this.downloadUrl), '_blank')
    //   this.viewProjectDetails();
    // });

    let body = {
      file_id: (this.files.length > 0 ? this.files.map((obj) => obj.id) : this.items.map(item => item.id))
    }

    this.manageProjectsService.downloadFile(this.id, body).subscribe((result: any) => {
        this.downloadUrl = result.data.file_path;
        window.open(this.commonService.csvPath(this.downloadUrl), '_blank');
        this.viewProjectDetails();
      });
  }

  getUrl(imgUrl): string {
    if (imgUrl == '' || imgUrl == null) {
      return 'assets/images/default-img.svg'
    }
    else {
      const parts = imgUrl.split('/');
      const desiredPart = 'image/' + parts[parts.length - 1];
      const part2 = desiredPart.split('?');
      return this.commonService.imagePath(part2[0]);
    }
  }

  deleteFiles(id) {
    this.userService.deleteFile(this.fileId).subscribe((result: any) => {
      this.toastr.success(result.data.message);
      this.viewProjectDetails();
      this.hideDeleteFileModal();
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

  hideDeleteFileModal() {
    this.modalService.dismissAll();
    this.closeDeleteFileModal();
  }

  hideRemoveUserModal() {
    this.modalService.dismissAll();
    this.closeRemoveUserModal();
  }

  openDeleteFileModal(id) {
    if(this.role == 3) {
      for(let i =0; i <this.data.length; i++) {
        if(this.data[i] == "Manage Projects") {
          this.open(this.templateRefDeleteFile);
          this.fileId = id;
        } else {
          this.toastr.error("You do not have access to delete this module");
        }
      }
    } else {
      this.open(this.templateRefDeleteFile);
      this.fileId = id;
    } 
  }
  deleteProject() {
    this.userService.removeUser(this.userId , this.id).subscribe((result: any) => {
      this.toastr.success("User is Removed");
      this.hideRemoveUserModal();
      this._location.back();
    });
  }

  closeDeleteFileModal() {
    const del = document.getElementById('deleteFileModal');
    if (del != null) {
      del.style.display = 'none';
    }
  }

  openRemoveUserModal() {
    this.open(this.templateRefRemoveUser);
  }

  closeRemoveUserModal() {
    const del = document.getElementById('removeUserModal');
    if (del != null) {
      del.style.display = 'none';
    }
  }

  back() {
    this._location.back();
  }
  goToView(fileId) {
    if(this.role == 3) {
      for(let i =0; i <this.data.length; i++) {
        if(this.data[i] == "Manage Projects") {
          this.router.navigate(['/pages/manage-projects-file-request-details'], { queryParams: { id: this.id,fileId: fileId ,role:2} });
        } else {
          this.toastr.error("You do not have access to view this module");
        }
      }
    } else {
      this.router.navigate(['/pages/manage-projects-file-request-details'], { queryParams: { id: this.id,fileId: fileId ,role:2} });
    }
  }
  goToEditFile(fileId) {
    if(this.role == 3) {
      for(let i =0; i <this.data.length; i++) {
        if(this.data[i] == "Manage Projects") {
          this.router.navigate(['/pages/manage-projects-add-file'], { queryParams: { id: this.id , role:2,fileId:fileId} });
        } else {
          this.toastr.error("You do not have access to edit this module");
        }
      }
    } else {
      this.router.navigate(['/pages/manage-projects-add-file'], { queryParams: { id: this.id , role:2,fileId:fileId} });
    }
   
  }

}
