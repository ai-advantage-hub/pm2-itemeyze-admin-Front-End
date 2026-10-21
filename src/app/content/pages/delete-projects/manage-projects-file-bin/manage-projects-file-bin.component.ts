import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ManageProjectsService } from 'src/app/content/core/services/manage-projects/manage-projects.service';

@Component({
  selector: 'app-manage-projects-file-bin',
  templateUrl: './manage-projects-file-bin.component.html',
  styleUrls: ['./manage-projects-file-bin.component.scss']
})
export class ManageProjectsFileBinComponent implements OnInit {
  items: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  closeResult: string = '';
  id:number;
  status:number;
  role:number;
  projectId:number;
  @ViewChild('denyModal') templateRefDenyFile: TemplateRef<any>;
  @ViewChild('deleteFileModal') templateRefDeleteFile: TemplateRef<any>;
  disapproved_files_count: any;
  deleteFileId: any;
  filecount: any;
  deletedFiles:any;
  

  constructor(private headerTitle: AppService, private modalService: NgbModal, private projectService:ManageProjectsService
    ,private toastr:ToastrService,private router: Router,private route:ActivatedRoute) {
   }

  ngOnInit(): void {
    this.headerTitle.setTitle('Manage Projects');
    this.getFromParams();
    this.getFileList();
    this.getMarkedFileList()
  }
  getFromParams(): void {
    this.route.queryParams.subscribe(params => {
      this.projectId = params.id;
    });
  }
  goBack() {
    this.router.navigate(['pages/manage-projects-view-project'],{queryParams: {id:this.projectId}})
  }

  goToDeleteBin(){
    this.router.navigate(['pages/manage-projects-deleted-files'],{queryParams: {id:this.projectId}})
  }
  goToMarkedBin(){
    this.router.navigate(['pages/manage-projects-mark-deletion'],{queryParams: {id:this.projectId}})
  }


  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;

  }
  getShownEntriesRange(): string {
    const startRange = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endRange = Math.min(this.currentPage * this.itemsPerPage, this.items.length);
    return `${startRange} - ${endRange}`;
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
  }

  openDenyModal(id, status) {
    this.id = id;
    this.status = status;
    if(status == 1) {
      this.role = 1 ;
    } else {
      this.role = 2 ;
    }
    this.open(this.templateRefDenyFile);
  }

  hideDenyModal() {
    this.modalService.dismissAll();
    
  }

  getFileList(){
    this.projectService.dissapproveList( this.projectId,this.currentPage, this.itemsPerPage).subscribe((res:any)=> {
      if(res.status == 200) {
        this.items = res.data.results;
        this.disapproved_files_count = res.data.count
      }
    });
  }

  getUrl(imgUrl): string {
    if (imgUrl == '' ||  imgUrl == null) {
      return 'assets/images/default-img.svg'
    }
    else {
      const parts = imgUrl.split('/');
      const desiredPart = 'image/' + parts[parts.length - 1];
      const part2 = desiredPart.split('?');
      return this.headerTitle.imagePath(part2[0]);
    }
  }

  changeStatus() {
    const body = {
      "file_id" : this.id,
      "status_value" : this.status
    }
    this.projectService.approveDissFile(body).subscribe((res:any) => {
      this.toastr.success(res.data.message);
      this.hide();
      this.getFileList();
    });
  }

  goToViewFile(id) {
    this.router.navigate(['/pages/manage-projects-file-request-details'], { queryParams: { fileId: id ,role:3,id:this.projectId} });
  }


  hideDeleteModal() {
    this.modalService.dismissAll();

  }
  openDeleteModal(id) {
    this.deleteFileId = id;
    this.open(this.templateRefDeleteFile);
  }
  hideDeleteFileModal() {
    this.modalService.dismissAll();

  }

  deleteFiles() {
    this.projectService.deleteapprovedFiles(this.deleteFileId).subscribe((result: any) => {
      this.toastr.success(result.data.message);
      this.getFileList();
      this.hideDeleteModal();
    });
  }


  getMarkedFileList(){
    this.projectService.viewMarkedList(this.projectId,this.currentPage, this.itemsPerPage).subscribe((res:any)=> {
      if(res.status == 200) {
        this.filecount = res.data.count
      }
    });
    this.projectService.listDeleteFiles(this.projectId,this.itemsPerPage,this.currentPage).subscribe((res: any) => {
      if(res.status == 200) {
        this.deletedFiles = res.data.count
      }
    });
  }

}
