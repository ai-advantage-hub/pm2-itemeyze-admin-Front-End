import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Chart from "chart.js/auto";
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ManageUsersService } from 'src/app/content/core/services/manage-users/manage-users.service';
import { ManageCompanyService } from 'src/app/content/core/services/manage-company/manage-company.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manage-users-view-profile',
  templateUrl: './manage-users-view-profile.component.html',
  styleUrls: ['./manage-users-view-profile.component.scss'],
  providers: [DatePipe]
})
export class ManageUsersViewProfileComponent implements OnInit {  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];
  myDate = new Date();
  selectedyear: any = this.myDate.getFullYear().toString();
  items: any = [];
  currentPage = 1;Sort
  itemsPerPage = 5;
  closeResult: string = '';
  id: number;
  deleteId: number;
  countForm: FormGroup;
  myChart: Chart;
  status:boolean;
  active:number;
  countArray: any = [];
  count:number;
  xAxis: any=[];
  role:number;
  role2:number;
  userData:any=[];
  show:boolean = false;
  monthValue:any;
  viewValue:number = 1;
  monthName:string;
  yearValue:number;
  moduleData:any= [];
  showView:boolean = false;
  @ViewChild('deleteUserModal') templateRefDeleteUser: TemplateRef<any>;
  @ViewChild('deactivateUserModal') templateRefDeactivateUser: TemplateRef<any>;
  // years: number[] = Array.from({ length: 1 }, (_, i) => new Date().getFullYear() - i);
  month = (new Date().getMonth() + 1) > 1 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1);
  userId: any;
  editForm: FormGroup;
  full_name: string;
  searchCompany: string = "";
  companyArr:any=[];
  selectedYear: number;
  years: number[] = [];
  @ViewChild('editModal') templateRef: TemplateRef<any>;

  constructor(private headerTitle: AppService, private modalService: NgbModal, private userService: ManageUsersService,
    private toastr: ToastrService, private router: Router, private route: ActivatedRoute,
    private commonService: AppService, private fb: FormBuilder,
    private companyService:ManageCompanyService) { 
    
    }

  ngOnInit(): void {
    this.headerTitle.setTitle('Manage Users');
    this.role2 =  JSON.parse(localStorage.getItem('role'));
    this.moduleData =  JSON.parse(localStorage.getItem('modules') || "[]");
    if(this.role2 == 3) {
      for(let i =0; i <this.moduleData.length; i++) {
        if(this.moduleData[i] == "Manage Projects") {
          this.showView = false;
        }  else {
          this.showView = true;
        }
      }
    } else if( this.role2 == 1) {
      this.showView = false;
    }
    this.yearDropdown();
    this.getFromParams();
    this.getUserDetail();
    this.initForm();
    this.graph();
    this.getUserProjects();
    this.initEditForm();
    this.companyList();
  }

  initForm(): void {
    this.countForm = this.fb.group(
      {
        view: [1, Validators.required],
        project:['', Validators.required],
        year: [this.selectedyear, Validators.required],
        month: [this.month, Validators.required],
      });
  }

  initEditForm(): void {
    this.editForm = this.fb.group(
      {
        user_name: ['', Validators.required],
        company_name: ['', Validators.required],
      });
  }
  yearDropdown() {
    this.selectedYear = new Date().getFullYear();
    for (let year = this.selectedYear; year >= 2023; year--) {
      this.years.push(year);
    }
  }

  getFromParams(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      this.role = params.role;
    });
  }

  statusChange(value) {
    const body = {
      user_id: this.id,
      status_value: value
    }
    this.userService.updateUserStatus(body).subscribe((result: any) => {
      this.toastr.success(result.data.message);
      this.hideDeactivateUserModal();
      this.router.navigate(['/pages/manage-users']);
      // this.getDetail();

    });
  }

  getUserDetail() {
    this.userService.viewUser(this.id).subscribe((result: any) => {
      this.userData = result.data;
    });
  }

  getUserProjects(){
    this.userService.userProjects(this.id).subscribe((result: any) => {
      if(result.status == 200) {
       this.items = result.data;
      }
     });
  }

  deleteUser() {
    this.userService.deleteUserAdmin(this.deleteId).subscribe((result: any) => {
      this.toastr.success(result.data.message);
      this.closeDeleteUserModal();
      this.router.navigate(['/pages/manage-users']);
      // this.getUserDetail();
      this.hideDeleteUserModal();
    })
  }

  imagePath(imgUrl): string {
    if (imgUrl == '' || imgUrl == null) {
      return 'assets/images/dummyuser-image.svg'
    }
    else {
      const parts = imgUrl.split('/');
      const desiredPart = 'image/' + parts[parts.length - 1];
      const part2 = desiredPart.split('?');
      return this.commonService.imagePath(part2[0]);
    }
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

  hideDeleteUserModal() {
    this.modalService.dismissAll();
    this.closeDeleteUserModal();
  }

  hideDeactivateUserModal() {
    this.modalService.dismissAll();
    this.closeDeactivateUserModal();
  }

  openDeleteUserModal(id) {
    this.deleteId = id;
    this.open(this.templateRefDeleteUser);
  }

  closeDeleteUserModal() {
    const del = document.getElementById('deleteUserModal');
    if (del != null) {
      del.style.display = 'none';
    }
  }

  openDeactivateUserModal(status) {
    this.active = status;
    this.open(this.templateRefDeactivateUser);
  }

  closeDeactivateUserModal() {
    const del = document.getElementById('deactivateUserModal');
    if (del != null) {
      del.style.display = 'none';
    }
  }

  viewAllPage() {
    this.router.navigate(['/pages/manage-users-view-project'], { queryParams: { id: this.id } });

  }
  graph() {
    if(this.viewValue == 2) {
      this.monthValue = Number(this.countForm.controls.month.value);
      let findMonth = this.months.find(e => e.value === this.monthValue)
      this.monthName = findMonth.name;
    } else {
      this.monthValue = '';
    }
    const project = this.countForm.controls.project.value ? this.countForm.controls.project.value : '';
    this.yearValue = this.countForm.controls.year.value ?  this.countForm.controls.year.value : '';
    this.userService.graphData(this.id, project,this.yearValue,this.monthValue).subscribe((result: any) => {
      if (result.status == 200) {
        this.countArray = [];
        this.xAxis = [];
        for(let i = 0; i< result.data.data.length; i++) {
          this.countArray.push(result.data.data[i].files_count);
          if(this.monthValue == '') {
            let sliceValue = String(this.yearValue).slice(2,4)
            this.xAxis =  ["Jan'" + sliceValue, "Feb'"+ sliceValue, "Mar'"+ sliceValue, "Apr'"+ sliceValue, "May'"+ sliceValue, "Jun'"+ sliceValue, "Jul'"+ sliceValue, "Aug'"+ sliceValue, "Sep'"+ sliceValue, "Oct'"+ sliceValue, "Nov'"+ sliceValue, "Dec'"+ sliceValue];
          } else {
            let shortValue = result.data.data[i].day.slice(8, 10)
            this.xAxis.push(shortValue);
            
          }
        }
        this.getGraph();
      }
    });
  }

  getGraph() {
    if (this.myChart) this.myChart.destroy();
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    var gradientFill = ctx.createLinearGradient(0, 1000, 0, 500); //to give colorGradient
    gradientFill.addColorStop(0, "#90EE90");
    gradientFill.addColorStop(1, "#ADD8E6");

    this.myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.xAxis,
        datasets: [{
          data: this.countArray,
          // fill: true,
          // borderColor: '#2196f3',
          backgroundColor: gradientFill,
          borderWidth: 0
        }
      ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        elements: {
          point: {
            radius: 0
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,

            title: {
              display: true,
              text: "Count",
              color: '#555555',
              font: {
                size: 15,
                family: 'Montserrat'
              }
            },
            grid: {
              display: false
            },
            ticks: {
              stepSize: 5,
            }
          }
        }
      }
    });
  }
  onchangeValue(event) {
    if(event == 2) {
      this.viewValue = 2;
      this.show = true;
    } else {
      this.show = false;
      this.viewValue = 1;
    }
    this.graph();
  }

  viewProjectDetails(id) {
    this.router.navigate(['/pages/manage-users-project-details'], { queryParams: { id: id,userId:this.id } });
  
  }
  resetFilter() {
    this.countForm.controls['year'].setValue(this.selectedyear);
    this.countForm.controls['view'].setValue("1");
    this.countForm.controls['project'].setValue("");
    this.graph();
  }



  openEditModal(username, companyname, id) {
    this.userId = id;
    this.full_name = username;
    this.searchCompany = companyname;
    this.editForm.controls['company_name'].setValue(companyname)
    this.editForm.patchValue({ user_name: this.full_name })
    this.openmodal(this.templateRef);
  }

  openmodal(content): void {
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

  hide() {
    this.modalService.dismissAll();
    this.editForm.reset();
  }

  UserEdit() {
    const body = {
      "company": this.editForm.controls.company_name.value
    }

    this.userService.editUser(this.userId, body).subscribe((res: any) => {
      this.toastr.success(res.data.message);
      this.hide();
      this.getUserDetail();
    })
  }  

  companyList() {
    this.companyService.companyName().subscribe((res:any) => {
      this.companyArr = res.data;

    });
  }

}
