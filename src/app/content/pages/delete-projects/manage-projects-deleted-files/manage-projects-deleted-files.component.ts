import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ManageProjectsService } from 'src/app/content/core/services/manage-projects/manage-projects.service';

@Component({
  selector: 'app-manage-projects-deleted-files',
  templateUrl: './manage-projects-deleted-files.component.html',
  styleUrls: ['./manage-projects-deleted-files.component.scss']
})
export class ManageProjectsDeletedFilesComponent implements OnInit {
  items: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  closeResult :string = '';
  projectId:number;
  checkedData:any=[];
  isChecked:boolean = false;
  deleteId:number;
  filter:number = 0;
  @ViewChild('restoreModal') templateRefRestoreProject: TemplateRef<any>;
  filecount: any;
  disapproved_files_count: any;
  deletedFiles:any;

  constructor(private headerTitle: AppService, private modalService: NgbModal, private projectServcie:ManageProjectsService,
    private route:ActivatedRoute,private router:Router, private toastr: ToastrService) {
   }

  ngOnInit(): void {
    this.headerTitle.setTitle('Manage Projects');
    this.getFromParams();
    this.getFilesList();
    this.getFileListmarkdeletion();
    this.getFileListdisapproved()
  }

  getFromParams(): void {
    this.route.queryParams.subscribe(params => {
      this.projectId = params.id;
    });
  }
  goBack() {
    this.router.navigate(['pages/manage-projects-view-project'],{queryParams: {id:this.projectId}})
  }
  goToFileBin(){
    this.router.navigate(['pages/manage-projects-file-bin'],{queryParams: {id:this.projectId}})
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

  openRestoreModal(id) {
    this.checkedData = [];
    this.checkedData.push(id);
    this.open(this.templateRefRestoreProject);
  }
  openSelectModal(id) {
    this.deleteId = id;
    this.open(this.templateRefRestoreProject);
  }

  hideRestoreModal() {
    this.modalService.dismissAll();
    this.filter= 0;
    this.isChecked  = false;
  }
  restoreDeleteFiles(){
    const body = {
      "file_id": this.checkedData
    }
    this.projectServcie.restoreFile(body).subscribe((res:any) => {
      this.toastr.success(res.data.Message);
      this.hideRestoreModal();
      this.filter  =0;
      this.getFilesList();
    });
  }
  
  getFilesList() {
    this.projectServcie.listDeleteFiles(this.projectId,this.itemsPerPage,this.currentPage).subscribe((res: any) => {
      this.items = res.data.results;
    });
  }


  checkedAll(event) {
    this.checkedData = [];
    const checked = event.target.checked; // stored checked value true or false
    if (checked) {
      for (let i = 0; i < this.items.length; i++) {
        this.isChecked = true;
        this.checkedData.push(this.items[i].id); // push the Id in array if checked
      }
    } else {
      this.checkedData = []; // Then remove
      this.isChecked = false;
    }
  }
  
  onCheckTask(Id, event) {
    if (event.target.checked) {
      this.checkedData.push(Id); // push the Id in array if checked

    } else {
      const index = this.checkedData.findIndex((list) => list == Id); //Find the index of stored id
      this.checkedData.splice(index, 1); // Then remove
    }
 
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

  getFileListmarkdeletion(){
    this.projectServcie.viewMarkedList(this.projectId,this.currentPage, this.itemsPerPage).subscribe((res:any)=> {
      if(res.status == 200) {
        this.filecount = res.data.count
      }
    });
  }

  getFileListdisapproved(){
    this.projectServcie.dissapproveList( this.projectId,this.currentPage, this.itemsPerPage).subscribe((res:any)=> {
      if(res.status == 200) {
        this.disapproved_files_count = res.data.count
      }
    });
    this.projectServcie.listDeleteFiles(this.projectId,this.itemsPerPage,this.currentPage).subscribe((res: any) => {
      if(res.status == 200) {
        this.deletedFiles = res.data.count
      }
    });
  }
 
  goToViewFile(id) {
    this.router.navigate(['/pages/manage-projects-file-request-details'], { queryParams: { fileId: id ,role:4,id:this.projectId} });
  }

}
