import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgetForm:FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.initForm();
  }
  
  initForm():void{
    this.forgetForm = this.formBuilder.group(
      {
        email: ['', [Validators.required,Validators.pattern(environment.emailRegex)]]
      }
    );
  }

  forgetPassword(){
    localStorage.setItem('email', JSON.stringify(this.forgetForm.value));
    this.authService.forgotPassword(this.forgetForm.value).subscribe((res:any)=>{
     if(res.status == 200){
      this.toastr.success(res.data.message);
      this.router.navigate(['/auth/email-send']);
     }
      else {
        this.toastr.error(res.message);
      }
     });
  }
}
