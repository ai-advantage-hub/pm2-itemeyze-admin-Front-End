import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { SubAdminService } from 'src/app/content/core/services/sub-admin/sub-admin.service';

@Component({
  selector: 'app-manage-sub-admins-add',
  templateUrl: './manage-sub-admins-add.component.html',
  styleUrls: ['./manage-sub-admins-add.component.scss']
})
export class ManageSubAdminsAddComponent implements OnInit {
  showPassword: boolean = false;
  addAdmin: FormGroup;
  id: number;
  role:number;
  data:any=[];
  ManageUsers:boolean = false;
  ManageContent:boolean = false;
  ManageProjects:boolean = false;
  ManageCompanies:boolean = false;
  modules:any=[];
  modulesArray:any=[];

  constructor(private headerTitle: AppService, private toastr: ToastrService, private router: Router,
    private route: ActivatedRoute, private fb: FormBuilder, private adminService: SubAdminService) { }

  ngOnInit(): void {
    this.headerTitle.setTitle('Manage Sub Admins');
    this.getFromParams();

  }
  getFromParams() {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      this.role= params.role;
      if(this.role == 1) {
        this.initForm();
        this.addAdmin.addControl('temporary_password', this.fb.control('', [Validators.required,Validators.minLength(8), Validators.maxLength(15),Validators.pattern(environment.passwordRegex)]));
      } else {
        this.getSubAdmin();
        this.initForm();
        this.addAdmin.removeControl('temporary_password');
      }

    }); 
  }

  initForm(): void {
    this.addAdmin = this.fb.group(
      {
        full_name: ['', Validators.required],
        email: ['', [Validators.required ,Validators.pattern(environment.emailRegex)]],
        phone_number: ['', Validators.required,Validators.minLength(8), Validators.maxLength(15)],
        // temporary_password: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(15),Validators.pattern(environment.passwordRegex)]],
      });
  }
  moduleValue(value) {
    this.modulesArray=[];
     if(this.ManageUsers) {
      this.modulesArray.push("Manage Users")
    };
    if(this.ManageContent) {
      this.modulesArray.push("Manage Content")
    };
    if( this.ManageProjects) {
      this.modulesArray.push("Manage Projects")
    };
     if(this.ManageCompanies) {
      this.modulesArray.push("Manage Companies")
    }
  }

  addSubAdmin() {
    const body = {
      full_name: this.addAdmin.controls.full_name.value,
      email: this.addAdmin.controls.email.value,
      phone_number: this.addAdmin.controls.phone_number.value,
      temporary_password: this.addAdmin.controls.temporary_password.value,
      modules_accessible:this.modulesArray
    }
    this.adminService.createSubAdmin(body).subscribe((res: any) => {
      this.toastr.success(res.data.message);
      this.addAdmin.reset();
      this.router.navigate(['/pages/manage-sub-admins']);
    });
  }
  updateAdmin(){
    const body = {
      full_name: this.addAdmin.controls.full_name.value,
      email: this.addAdmin.controls.email.value,
      phone_number: this.addAdmin.controls.phone_number.value,
      temporary_password: this.addAdmin.controls.temporary_password.value,
      modules_accessible:this.modulesArray
    }
    this.adminService.editSubAdmin(this.id,body).subscribe((res: any) => {
      this.toastr.success(res.data.message);
      this.addAdmin.reset();
      this.router.navigate(['/pages/manage-sub-admins']);
    });
  }

  getSubAdmin() {
    this.adminService.viewSubAdmin(this.id).subscribe((res: any) => {
      if (res.status == 200) {
        this.data = res.data[0];
        this.addAdmin = this.fb.group({
          full_name: [this.data.full_name, Validators.required],
          email: [this.data.email, [Validators.required,Validators.pattern(environment.emailRegex)]],
          phone_number:[this.data.phone_number,[Validators.required, Validators.pattern(/^\d{8,16}$/)]],
          temporary_password: ['', Validators.required],
        });
        this.modulesArray= this.data.modules_accessible;
        for(let i =0; i <this.modulesArray.length; i++) {
          if(this.modulesArray[i] == "Manage Users") {
            this.ManageUsers = true;
          } else if(this.modulesArray[i] == "Manage Content") {
            this.ManageContent = true;
          }else if(this.modulesArray[i] == "Manage Projects") {
            this.ManageProjects = true;
          }else if(this.modulesArray[i] == "Manage Companies") {
            this.ManageCompanies = true;
          }
        }
      }
    });
  }

  checkValid(){
    // this.addAdmin.valid;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  allow_numbers_only(event) {
    var k;
    k = event.keyCode;
    return ((k >= 48 && k <= 57));
  }

}
