import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  ModalDismissReasons,
  NgbDateStruct,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ManageProjectsService } from 'src/app/content/core/services/manage-projects/manage-projects.service';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageCompanyService } from 'src/app/content/core/services/manage-company/manage-company.service';
import { ManageUsersService } from 'src/app/content/core/services/manage-users/manage-users.service';
import { HttpClient } from '@angular/common/http';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';

const BATCH_SIZE = 100;

// import { blob } from 'aws-sdk/clients/codecommit';

@Component({
  selector: 'app-manage-projects-view-project',
  templateUrl: './manage-projects-view-project.component.html',
  styleUrls: ['./manage-projects-view-project.component.scss'],
})
export class ManageProjectsViewProjectComponent implements OnInit {
  items: any = [];
  showModal = false;
  filter: number = 0;
  id: any;
  deleteId: number;
  deleteFileId: number;
  currentPage = 1;
  itemsPerPage = 100;
  files: any = [];
  closeResult: string = '';
  downloadUrl: string;
  count: number;
  fileList: any = [];
  @ViewChild('deleteProjectModal') templateRefDeleteProject: TemplateRef<any>;
  @ViewChild('deleteFileModal') templateRefDeleteFile: TemplateRef<any>;
  @ViewChild('editModel') templateRef: TemplateRef<any>;
  fileCount: number;
  dataitems: any;

  assigners = [];
  selectedEmail: any = [];
  selectedId = [];
  project_details: any;
  created_by_admin: boolean;
  emails = [];
  ids = [];
  selectedData = [];
  ownership_to_admin: boolean;
  company_id: any;
  project_id: any;
  company_name: any;
  EditProjectForm: FormGroup;
  companyArray: any = [];
  companyArr: any = [];
  searchText: string = '';
  filteredData: any = [];
  thumbnailsData: any[] = [];
  image: any;
  imagename: any;

  downlaodzip: boolean = false;
  downloadbtn: boolean = false;

  startDate: NgbDateStruct | null = null;
  endDate: NgbDateStruct | null = null;
  searchFile: string;

  selectedItems: any[] = [];
  selectAll: boolean = false;
  newSelectedItems:any []= [];

  constructor(
    private http: HttpClient,
    private manageProjectsService: ManageProjectsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private cd: ChangeDetectorRef,
    private commonService: AppService,
    private companyService: ManageCompanyService,
    private fb: FormBuilder,
    private manageUserService: ManageUsersService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initEditprojectform();
    this.companyList();
    this.commonService.setTitle('Manage Projects');
    this.getFromParams();
    this.viewProjectDetails();
    // this.unapprovedCount();
    this.approvedFileList(this.currentPage);
    // this.projectlist('',1)
  }

  getLastPage(): number {
    return Math.ceil(this.count / 100);
  }

  downloadFiles() {
    const idsArray = this.newSelectedItems.map((obj) => obj.id);
    if(this.startDate && !this.endDate){
      this.toastr.error('End-date must be selected')
      return;
    }
    else if(!this.startDate && this.endDate){
      this.toastr.error('Start-date must be selected')
      return;
    }
    this.manageProjectsService
      .GetSelectedProjectImages(this.id, idsArray)
      .subscribe((result: any) => {
        if (result.status == 200) {
          // this.items = result.data.results;
          // this.count = result.data.count;
          this.selectAll = false;
          this.approvedFileList(this.currentPage);
        }
      });
  }

  // Updates the selected items when an individual checkbox is changed
  onItemSelect() {
    this.selectedItems = this.items.filter((item) => item.selected);
    this.selectAll = this.items.every(
      (item) => item.is_downloaded || item.selected
    );
  }

  // Toggles all checkboxes
  toggleAll() {
    this.items.forEach((item) => {
      if (!item.is_downloaded) {
        item.selected = this.selectAll; // Only toggle if not downloaded
      }
    });
    this.onItemSelect(); // Update selected items
  }

  formatDate(date: NgbDateStruct | null): string {
    if (!date) {
      return '';
    }

    // Format each part (month/day/year) to ensure leading zeroes
    const month = String(date.month).padStart(2, '0');
    const day = String(date.day).padStart(2, '0');
    const year = date.year;

    return `${month}/${day}/${year}`;
  }

  onStartDateSelect(date: NgbDateStruct) {
    this.startDate = date;
    this.currentPage = 1;
    if(this.endDate){
      this.approvedFileList(1);
    }
    // Optionally, you can reset the end date if it's before the start date
    if (this.endDate && this.compareDates(this.endDate, this.startDate) < 0) {
      this.endDate = null;
    }
  }

  onEndDateSelect(date: NgbDateStruct) {
    this.endDate = date;
    this.currentPage = 1;
    if(this.startDate){
      this.approvedFileList(1);
    }
  }

  compareDates(date1: NgbDateStruct, date2: NgbDateStruct): number {
    const d1 = new Date(date1.year, date1.month - 1, date1.day);
    const d2 = new Date(date2.year, date2.month - 1, date2.day);
    return d1.getTime() - d2.getTime();
  }

  formatInput(input: HTMLInputElement) {
    const FILTER_PAG_REGEX = /[^0-9]/g;
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  resetFilter() {
    this.currentPage = 1;
    this.startDate = null;
    this.endDate = null;
    this.searchFile = '';
    this.approvedFileList(1);
  }

  approvedFileList(currentPage) {
    this.manageProjectsService.newApproveFile(
      this.id,
      this.searchFile || '',
      this.formatDate(this.startDate),
      this.formatDate(this.endDate)
      ).subscribe((result:any)=>{
        if (result.status == 200) { 
          this.newSelectedItems = result.data;
        }
      })

    this.manageProjectsService
      .approveFile(
        this.id,
        currentPage,
        this.itemsPerPage,
        this.searchFile || '',
        this.formatDate(this.startDate),
        this.formatDate(this.endDate)
      )
      .subscribe((result: any) => {
        if (result.status == 200) {
          this.items = result.data.results;
          this.count = result.data.count;
          
        }
      });
  }
  getFromParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params.id;
    });
  }

  viewProjectDetails() {
    this.manageProjectsService.viewProject(this.id).subscribe((result: any) => {
      if (result.status == 200) {
        this.dataitems = result.data;
        this.files = result.data.files;
        this.fileCount = result.data.files_count;
      }
    });
  }

  deleteProjectName() {
    this.manageProjectsService
      .deleteProject(this.deleteId)
      .subscribe((result: any) => {
        this.toastr.success(result.message);
        this.hideDeleteModal();
        this.router.navigate(['/pages/manage-projects']);
      });
  }
  // onPageChange(pageNumber: number): void {
  //   this.currentPage = pageNumber;

  // }
  // getShownEntriesRange(): string {
  //   const startRange = (this.currentPage - 1) * this.itemsPerPage + 1;
  //   const endRange = Math.min(this.currentPage * this.itemsPerPage, this.files.length);
  //   return `${startRange} - ${endRange}`;
  // }

  deleteFiles() {
    this.manageProjectsService
      .deleteapprovedFiles(this.deleteFileId)
      .subscribe((result: any) => {
        this.toastr.success(result.data.message);
        this.viewProjectDetails();
        this.hideDeleteModal();
        this.approvedFileList(this.currentPage);
      });
  }
  goToFiles() {
    this.router.navigate(['/pages/manage-projects-file-bin'], {
      queryParams: { id: this.id },
    });
  }
  gotToViewFile(id) {
    this.router.navigate(['/pages/manage-projects-file-request-details'], {
      queryParams: { id: this.id, fileId: id, role: 2 },
    });
  }
  fileListing() {
    this.router.navigate(['/pages/manage-projects-file-request'], {
      queryParams: { id: this.id },
    });
  }
  goToAddFile() {
    this.router.navigate(['/pages/manage-projects-add-file'], {
      queryParams: { id: this.id, role: 1 },
    });
  }
  goToeditFile(id) {
    this.router.navigate(['/pages/manage-projects-add-file'], {
      queryParams: { id: this.id, role: 2, fileId: id },
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

  hideDeleteModal() {
    this.modalService.dismissAll();
  }
  openDeleteModal(id) {
    this.deleteId = id;
    this.open(this.templateRefDeleteProject);
  }
  hideDeleteFileModal() {
    this.modalService.dismissAll();
  }
  openDeleteFileModal(id) {
    this.deleteFileId = id;
    this.open(this.templateRefDeleteFile);
  }

  fileExport() {
    let body = {
      file_id: (this.newSelectedItems.length > 0 ? this.newSelectedItems.map((obj) => obj.id) : this.items.map(item => item.id))
    }
    if(this.startDate && !this.endDate){
      this.toastr.error('End-date must be selected')
      return;
    }
    else if(!this.startDate && this.endDate){
      this.toastr.error('Start-date must be selected')
      return;
    }
    this.manageProjectsService
      .downloadFile(this.id, body)
      .subscribe((result: any) => {
        this.downloadUrl = result.data.file_path;
        window.open(this.commonService.csvPath(this.downloadUrl), '_blank');
        this.viewProjectDetails();
        this.approvedFileList(1);
        this.selectAll = false;
        this.selectedItems.length = 0;
      });
  }
  getUrl(imgUrl): string {
    if (imgUrl == '' || imgUrl == null) {
      return 'assets/images/default-img.svg';
    } else {
      const parts = imgUrl.split('/');
      const desiredPart = 'image/' + parts[parts.length - 1];
      const part2 = desiredPart.split('?');
      return this.commonService.imagePath(part2[0]);
    }
  }

  // unapprovedCount() {
  //   this.manageProjectsService.getFileCount(this.id).subscribe((result: any) => {
  //     if (result.status == 200) {
  //       this.count = result.data;
  //     }
  //   });
  // }

  onPageChange(pageNumber: number, search: string): void {
    this.currentPage = pageNumber;
    // this.projectlist(search,this.currentPage);
    this.approvedFileList(pageNumber);
  }
  getShownEntriesRange(): string {
    const startRange = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endRange = Math.min(this.currentPage * this.itemsPerPage, this.count);
    return `${startRange} - ${endRange}`;
  }

  // projectlist(search,page){
  //   this.manageProjectsService.approveFile(this.id,this.currentPage, this.itemsPerPage).subscribe((result: any) => {
  //     this.items = result.data.results;
  //     this.count = result.data.count;
  // })
  // }
  initEditprojectform() {
    this.EditProjectForm = this.fb.group({
      project_name: ['', Validators.required],
      project_number: ['', Validators.required],
      company_name: ['', Validators.required],
      assign_to: ['', Validators.required],
      site_name: ['', Validators.required],
    });
  }

  openEditModel(project_id) {
    this.open(this.templateRef);
    this.ProjectDetails(project_id);
  }

  ProjectDetails(project_id) {
    this.project_id = project_id;
    this.emails = [];
    this.ids = [];
    this.manageProjectsService
      .GetProjectDetails(project_id)
      .subscribe((res: any) => {
        this.project_details = res.data;
        this.company_id = this.project_details.company_id;
        this.company_name = this.project_details?.company_name;
        this.project_details.project_users.forEach((user) => {
          this.emails.push(user.email);
          this.ids.push(user.id);
        });
        this.created_by_admin = this.project_details?.created_by_admin;
        this.ownership_to_admin = this.created_by_admin;
        this.company_id = this.project_details?.company_id;
        if (this.project_details.company_id != null) {
          this.emailSearch(this.project_details.company_id);
        }
        this.EditProjectForm.patchValue({
          project_name: this.project_details?.project_name,
          project_number: this.project_details?.project_number,
          company_name: this.project_details?.company_name,
          assign_to: this.ids,
          site_name: this.project_details?.site_name,
        });
      });
  }

  EditProject() {
    let body = {
      project_name: this.EditProjectForm.value.project_name,
      project_number: this.EditProjectForm.value.project_number,
      company_name: this.company_name,
      assigned_to: this.ids,
      site_name: this.EditProjectForm.value.site_name,
      company_id: this.company_id,
      ownership_to_admin: this.ownership_to_admin,
    };
    this.manageProjectsService
      .UpdateProject(this.project_id, body)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.viewProjectDetails();
          this.toastr.success('Project updated successfully');
          this.hideDeleteModal();
        }
      });
  }

  selectData(data) {
    if (!this.ids.includes(data.user_id)) {
      this.ids.push(data.user_id);
      this.EditProjectForm.patchValue({
        assign_to: this.ids,
      });
      this.emails.push(data.user__email);
    }
    this.EditProjectForm.controls['assign_to'].setValue('');
  }

  companyList() {
    this.companyService.companyName().subscribe((res: any) => {
      this.companyArr = res.data;
    });
  }

  CompanySelection(event) {
    if (this.EditProjectForm.value.company_name == null) {
      this.company_name = '';
      this.company_id = '';
    }
    if (event != null) {
      this.emailSearch(event.id);
      this.company_id = event.id;
      this.company_name = event.name;
    }
    this.emails = [];
    this.ids = [];
  }

  emailSearch(emailId) {
    this.manageUserService.searchName2(emailId).subscribe((res: any) => {
      this.assigners = res.data;
    });
  }

  removeIdAndEmail(i) {
    this.ids.splice(i, 1);
    this.emails.splice(i, 1);
  }

  transferownership(ownership) {
    this.ownership_to_admin = ownership.target.checked;
  }

  // DownloadImages(): void {
  //   this.manageProjectsService.GetProjectImages(this.id).subscribe((res: any) => {
  //     saveAs(res, `${this.id}.zip`);
  //   }),
  //     error => {
  //       console.error('Error getting data from API', error);
  //     }
  // }

  // getDownloadData(): void {
  //   this.manageProjectsService.GetProjectImages(this.id).subscribe(
  //     (res: any) => {

  //       const blob = new Blob([res], { type: res.type });
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         try {
  //           const jsonData = JSON.parse(reader.result as string); // Parse blob data as JSON
  //           this.thumbnailsData = jsonData.data; // Store fetched thumbnails data
  //           this.image = this.thumbnailsData?.[0].thumbnail;
  //           this.imagename = this.thumbnailsData?.[0].thumbnail;
  //           this.downloadZip(this.thumbnailsData);
  //         } catch (error) {
  //           console.error('Error parsing JSON from blob:', error);
  //         }
  //       };
  //       reader.onerror = () => {
  //         console.error('Error reading blob as text:', reader.error);
  //       };
  //       reader.readAsText(blob);
  //     },
  //     error => {
  //       console.error('Error getting data from API', error);
  //     }
  //   );
  // }

  // downloadZip(data: any[]) {
  //   const zip = new JSZip();
  //   this.spinner.show();
  //   const processBatch = (batch: any[], index: number): Promise<void> => {
  //     const downloadPromises = batch.map(item => {
  //       const filename = item.file_name;
  //       const thumbnailUrl = item.thumbnail;

  //       if (thumbnailUrl) {
  //         return fetch(thumbnailUrl)
  //           .then(response => {
  //             if (!response.ok) {
  //               throw new Error(`Failed to fetch ${thumbnailUrl}`);
  //             }
  //             return response.blob();
  //           })
  //           .then(blob => {
  //             zip.file(`${filename}.jpg`, blob);
  //           })
  //           .catch(error => {
  //             console.error('Error downloading image:', error);
  //           });
  //       } else {
  //         console.log('Skipping download for item with missing thumbnail:', filename);
  //         return Promise.resolve();
  //       }
  //     });

  //     return Promise.all(downloadPromises)
  //       .then(() => {
  //         if (index < data.length) {
  //           return processBatch(data.slice(index, index + BATCH_SIZE), index + BATCH_SIZE);
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error in batch processing:', error);
  //       });
  //   };

  //   processBatch(data.slice(0, BATCH_SIZE), BATCH_SIZE)
  //     .then(() => {
  //       zip.generateAsync({ type: "blob" })
  //         .then(content => {
  //           saveAs(content, "thumbnails.zip");
  //           console.log(this.downlaodzip, "qwerty")
  //           this.spinner.hide();
  //         })
  //         .catch(error => console.error('Error creating zip file:', error));
  //     })
  //     .catch(error => console.error('Error in processing:', error));
  // }

  getDownloadData(): void {
    this.manageProjectsService
      .GetProjectImagesNew(this.id)
      .subscribe((data: any) => {
        this.toastr.success(data.data.message);
        let disableDownloadBtn = document.getElementById(
          'downloadImageBtn'
        ) as HTMLInputElement;
        disableDownloadBtn.disabled = true;
        setTimeout(function () {
          disableDownloadBtn.disabled = false;
        }, 300000);
      });
  }
}
