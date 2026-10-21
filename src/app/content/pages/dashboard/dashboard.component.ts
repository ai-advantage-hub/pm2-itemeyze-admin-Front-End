import { ChangeDetectorRef, Component } from "@angular/core";
import { AppService } from "../../core/services/common/app.service";
import { DashboardService } from "../../core/services/dashboard/dashboard.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProfileService } from "../../core/services/profile/profile.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  months = [
    { value: 1, name: "January" },
    { value: 2, name: "February" },
    { value: 3, name: "March" },
    { value: 4, name: "April" },
    { value: 5, name: "May" },
    { value: 6, name: "June" },
    { value: 7, name: "July" },
    { value: 8, name: "August" },
    { value: 9, name: "September" },
    { value: 10, name: "October" },
    { value: 11, name: "November" },
    { value: 12, name: "December" },
  ];
  countData: any = [];
  countForm: FormGroup;
  data: any = [];
  myDate = new Date();
  selectedYear: number;
  years: number[] = [];
  constructor(
    private headerTitle: AppService,
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.headerTitle.setTitle("Dashboard");
    this.initForm();
    this.yearDropdown();
    this.profileData();
    this.dashboardData();
  }
  yearDropdown() {
    this.selectedYear = new Date().getFullYear();
    for (let year = this.selectedYear; year >= 2023; year--) {
      this.years.push(year);
    }
  }

  initForm(): void {
    this.countForm = this.fb.group({
      month: ["", Validators.required],
      year: ["", Validators.required],
    });
  }

  dashboardData() {
    this.countData = [];
    this.dashboardService
      .getDashboardData(this.countForm.value.month, this.countForm.value.year)
      .subscribe((result: any) => {
        this.countData = result.data;
        this.cd.detectChanges();
      });
  }
  profileData() {
    this.profileService.getProfile().subscribe((result: any) => {
      if (result.status == 200) {
        this.data = result.data[0];
      }
    });
  }

  reset() {
    this.countForm.controls["month"].setValue("");
    this.countForm.controls["year"].setValue("");
    this.dashboardData();
  }
}
