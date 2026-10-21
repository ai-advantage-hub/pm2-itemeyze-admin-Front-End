import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/services/auth/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";
import { catchError } from "rxjs/internal/operators/catchError";
import { of } from "rxjs/internal/observable/of";
import { tap } from "rxjs/internal/operators/tap";
import { AppService } from "../../core/services/common/app.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  submitted = false;
  password: string = "";
  showPassword: boolean = false;
  loginForm: FormGroup;
  hide: boolean = true;

  constructor(
    private commonService: AppService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
    this.initForm();
  }
  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        [Validators.required, Validators.pattern(environment.emailRegex)],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ],
      ],
    });
  }
  forgetPassword() {
    this.router.navigate(["/auth/forgot-password"]);
  }
  onLogin() {
    this.authService
      .signIn(this.loginForm.value)
      .pipe(
        catchError((err) => of(err)),
        tap((res: any) => {
          if (res && res.status === 200) {
            this.toastr.success("Login Successfully");
            localStorage.setItem("authToken", res.data.token);
            localStorage.setItem("role", JSON.stringify(res.data.user_role));
            let role = JSON.parse(localStorage.getItem("role"));
            localStorage.setItem(
              "modules",
              JSON.stringify(res.data.modules_accessible)
            );
            let modules = JSON.parse(localStorage.getItem("modules"));
            this.commonService.setSubAdmin(res.data.modules_accessible);
            if (role === 3) {
              if (modules[0] == "Manage Users")
                this.router.navigate(["/pages/manage-users"]);
              else if (modules[0] == "Manage Content")
                this.router.navigate(["/pages/manage-content"]);
              else if (modules[0] == "Manage Projects")
                this.router.navigate(["/pages/manage-projects"]);
              else if (modules[0] == "Manage Companies")
                this.router.navigate(["/pages/manage-companies"]);
            } else this.router.navigate(["/pages"]);
          }
          // this.toastr.error(res.error.message);
          // else this.toastr.error("Subadmin is Inactive.");
        })
      )
      .subscribe();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
