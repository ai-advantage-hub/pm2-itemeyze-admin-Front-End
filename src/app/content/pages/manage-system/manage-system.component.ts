import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/services/common/app.service';
import { ManageSystemService } from '../../core/services/manage-system/manage-system.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-system',
  templateUrl: './manage-system.component.html',
  styleUrls: ['./manage-system.component.scss']
})
export class ManageSystemComponent implements OnInit {
  versionForm: FormGroup;

  constructor(
    private headerTitle: AppService,
    private manageSystemService: ManageSystemService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.headerTitle.setTitle('Manage System');
    this.initForm();
    this.getVersionDetails();
  }

  initForm() {
    this.versionForm = this.fb.group({
      "ios_name": ['', Validators.required],
      "android_name": ['', Validators.required],
    })
  }

  getVersionDetails() {
    this.manageSystemService.getVersion().subscribe((data: any) => {
      if (data.data[0].name == 'android') {
        this.versionForm.patchValue({
          "ios_name": data.data[1].value,
          "android_name": data.data[0].value,
        })
      }
      else {
        this.versionForm.patchValue({
          "ios_name": data.data[0].value,
          "android_name": data.data[1].value,
        })
      }

    })
  }

  androidBuild() {
    let body = {
      "name": "android",
      "value": this.versionForm.controls.android_name.value
    }
    this.manageSystemService.updateVersion(body).subscribe((data: any) => {
      this.toastr.success(data.data.message);
      this.getVersionDetails();
    })
  }

  iosBuild() {
    let body = {
      "name": "ios",
      "value": this.versionForm.controls.ios_name.value
    }
    this.manageSystemService.updateVersion(body).subscribe((data: any) => {
      this.toastr.success(data.data.message);
      this.getVersionDetails();
    })
  }
}
