import { Component } from '@angular/core';
import { AppService } from '../../core/services/common/app.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../core/services/profile/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  changeForm:FormGroup;

  constructor(private headerTitle: AppService, private fb:FormBuilder, private router:Router, 
    private profileService:ProfileService,private toastr: ToastrService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.headerTitle.setTitle('Profile');
    this.initForm();
  }
  initForm(): void {
    this.changeForm = this.fb.group(
      {
        old_password: ['', [Validators.required]],
        new_password: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(15),Validators.pattern(environment.passwordRegex)]],
        confirm_password: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(15)]],
      },
      { validator: this.MatchPasswordValue }
      );
  }
  
  MatchPasswordValue(group: FormGroup) { 
    let pass = group.controls.new_password.value;
    let confirmPass = group.controls.confirm_password.value;

    return pass === confirmPass ? null : { notSame: true }
  }
  changePassword() {
    let body = {
      "new_password" : this.changeForm.value.new_password,
      "confirm_password" : this.changeForm.value.confirm_password,
      "old_password" : this.changeForm.value.old_password
    }
    this.profileService.changePassword(body).subscribe((res:any)=>{
      this.toastr.success(res.data.message);
        this.changeForm.reset();
        this.router.navigate(['/pages/manage-companies']);
      
     });
  }


  toggleOldPasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

}
