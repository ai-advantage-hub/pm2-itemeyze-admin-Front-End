import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ManageProjectsService } from 'src/app/content/core/services/manage-projects/manage-projects.service';

@Component({
  selector: 'app-manage-projects-deleted-projects',
  templateUrl: './manage-projects-deleted-projects.component.html',
  styleUrls: ['./manage-projects-deleted-projects.component.scss']
})
export class ManageProjectsDeletedProjectsComponent implements OnInit {
  items: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  closeResult :string = '';
  count:number;
  projectId: number;
  id:number;
  @ViewChild('restoreModal') templateRefRestoreProject: TemplateRef<any>;


  constructor(private headerTitle: AppService, private modalService: NgbModal,
    private manageProjectsService: ManageProjectsService, private toastr: ToastrService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.deletedProjectsList();
    this.headerTitle.setTitle('Manage Projects');
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.deletedProjectsList();

  }
  getShownEntriesRange(): string {
    const startRange = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endRange = Math.min(this.currentPage * this.itemsPerPage, this.count);
    return `${startRange} - ${endRange}`;
  }

  deletedProjectsList() {
    this.manageProjectsService.deletedProjects(this.currentPage,this.itemsPerPage).subscribe((result: any) => {
        this.items = result.data.results;
        this.count = result.data.count;
    })
  }

  restoreProject() {
    const body = {
      id: this.projectId
    }
    this.manageProjectsService.restoreDeletedProject(this.projectId, body).subscribe((result: any) => {
      this.toastr.success(result.data.Message);
      this.hideRestoreModal();
      this.deletedProjectsList()
  
    })
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
    this.projectId = id;
    this.open(this.templateRefRestoreProject);
  }

  hideRestoreModal() {
    this.modalService.dismissAll();
    
  }

}
