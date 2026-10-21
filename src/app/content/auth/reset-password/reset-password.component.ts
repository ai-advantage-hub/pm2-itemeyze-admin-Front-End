import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/auth/auth.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  otp: number;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.otp = params['otp'];
    });

  }

  ngOnInit(): void {
      this.initForm();
  }

  initForm() {
    this.resetForm = this.fb.group(
      {
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
            Validators.pattern(environment.passwordRegex),
          ],
        ],
        confirm_password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
          ],
        ],
      },
      { validator: this.MatchPasswordValue }
    );
  }

  backToLogin() {
    this.router.navigate(["/login"]);
  }

  changePassword() {
    const jsonObject = JSON.parse(localStorage.getItem('email'));
    let body = {
      otp: this.otp,
      new_password: this.resetForm.value.password,
      confirm_password: this.resetForm.value.confirm_password,
      // email: jsonObject.email,
    };
    this.authService.resetPassword(body).subscribe((res: any) => {
      this.toastr.success(res.data.message);
      this.resetForm.reset();
      this.router.navigate(["/login"]);
    });
  }

  MatchPasswordValue(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirm_password.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
