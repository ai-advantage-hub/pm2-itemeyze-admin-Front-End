import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ManageProjectsService } from 'src/app/content/core/services/manage-projects/manage-projects.service';

@Component({
  selector: 'app-manage-projects-mark-deletion',
  templateUrl: './manage-projects-mark-deletion.component.html',
  styleUrls: ['./manage-projects-mark-deletion.component.scss']
})
export class ManageProjectsMarkDeletionComponent implements OnInit {
  items: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  closeResult: string = '';
  checkedData:any= [];
  isSelected:boolean;
  allSelected:boolean = false;
  id:number;
  status:number;
  role:number;
  projectId:number;
  isChecked:boolean = false;
  filter:number = 0;
  value:boolean;
  @ViewChild('denyModal') templateRefDenyFile: TemplateRef<any>;
  filecount: any;
  disapproved_files_count: any;
  deletedFiles:any;

  constructor(private headerTitle: AppService, private modalService: NgbModal,private projectService:ManageProjectsService,
     private toastr: ToastrService, private router: Router,private route:ActivatedRoute) {
   }

  ngOnInit(): void {
    this.headerTitle.setTitle('Manage Projects');
    this.getFromParams();
    this.getFileList();
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
  goToDeleteBin(){
    this.router.navigate(['pages/manage-projects-deleted-files'],{queryParams: {id:this.projectId}})
  }
  goToFileBin(){
    this.router.navigate(['pages/manage-projects-file-bin'],{queryParams: {id:this.projectId}})
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

  openDenyModal(id , status, value) {
    this.value = value;
    this.id = id;
    this.status = status;
    this.role = status;
    this.open(this.templateRefDenyFile);
  }
  openSelectModal(status, value) {
    this.value= value;
    this.status = status;
    this.role = status;
    this.open(this.templateRefDenyFile);

  }

  hideDenyModal() {
    this.filter= 0;
    this.modalService.dismissAll();
  }
  approveFile() {
    if(!this.value) {
      this.checkedData = [];
      this.checkedData.push(this.id)
    }
    const body = {
      "file_id" :  this.checkedData,
      "status_value" : Number(this.status)
    }
    this.projectService.markeApproveFile(body).subscribe((res:any) => {
      this.toastr.success(res.data.message);
      this.hideDenyModal()
      this.getFileList();
    });
  }
  
  getFileList(){
    this.projectService.viewMarkedList(this.projectId,this.currentPage, this.itemsPerPage).subscribe((res:any)=> {
      if(res.status == 200) {
        this.items = res.data.results;
        this.filecount = res.data.count
      }
    });
  }

  getFileListdisapproved(){
    this.projectService.dissapproveList( this.projectId,this.currentPage, this.itemsPerPage).subscribe((res:any)=> {
      if(res.status == 200) {
        this.disapproved_files_count = res.data.count
      }
    });
    this.projectService.listDeleteFiles(this.projectId,this.itemsPerPage,this.currentPage).subscribe((res: any) => {
      if(res.status == 200) {
        this.deletedFiles = res.data.count
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
      // this.allSelected= false;
      const index = this.checkedData.findIndex((list) => list == Id); //Find the index of stored id
      this.checkedData.splice(index, 1); // Then remove
    }
 
  }



}
