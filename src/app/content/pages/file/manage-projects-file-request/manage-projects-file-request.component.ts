import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ManageProjectsService } from 'src/app/content/core/services/manage-projects/manage-projects.service';

@Component({
  selector: 'app-manage-projects-file-request',
  templateUrl: './manage-projects-file-request.component.html',
  styleUrls: ['./manage-projects-file-request.component.scss']
})
export class ManageProjectsFileRequestComponent implements OnInit {
  fileRequestForm: FormGroup;
  showModal = false;
  items: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  id: number;
  closeResult: string = '';
  deleteId: number;
  @ViewChild('approveModel') templateRef: TemplateRef<any>;
  @ViewChild('denyModal') templateRefDenyProject: TemplateRef<any>;

  constructor(private headerTitle: AppService, private manageProjectsService: ManageProjectsService,
    private route: ActivatedRoute, private toastr: ToastrService, private router: Router, private fb: FormBuilder, 
    private modalService: NgbModal,private commonService:AppService) {
  }

  ngOnInit() {
    this.headerTitle.setTitle('Manage Projects');
    this.getFromParams();
    this.initForm();
    this.getUnapprovedFiles();
  }

  initForm(): void {
    this.fileRequestForm = this.fb.group(
      {
        file_name: ['', Validators.required],
        file_number: ['', Validators.required],
        assigned_to: ['', Validators.required],
      });
  }
  getFromParams(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
    });
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
    this.fileRequestForm.reset();

  }

  openapproveModel(id) {
    this.id = id;
    this.open(this.templateRef);
  }

  getUnapprovedFiles() {
    this.manageProjectsService.unapprovedFileList(this.id).subscribe((result: any) => {
      if (result.status == 200) {
        this.items = result.data;
      }
    })
  }
  approveFiles(status,id) {
    const body = {
      "id" : id,
      "status_value" : status
    }
    this.manageProjectsService.approveFiles(body).subscribe((result: any) => {
      this.toastr.success(result.data.message);
      this.getUnapprovedFiles();
      this.hideDenyModal();
    });

  }

  openDenyModal(id) {
    this.deleteId = id;
    this.open(this.templateRefDenyProject);
  }

  hideDenyModal() {
    this.modalService.dismissAll();
    
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
  back(){
    this.router.navigate(['/pages/manage-projects-view-project'], { queryParams: { id: this.id } });
  }
  goToView(fileId){
    this.router.navigate(['/pages/manage-projects-file-request-details'], { queryParams: { id: this.id,fileId: fileId,role:1 } });
  }
}

