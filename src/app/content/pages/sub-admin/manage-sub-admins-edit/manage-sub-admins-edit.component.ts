import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/content/core/services/common/app.service';


@Component({
  selector: 'app-manage-sub-admins-edit',
  templateUrl: './manage-sub-admins-edit.component.html',
  styleUrls: ['./manage-sub-admins-edit.component.scss']
})
export class ManageSubAdminsEditComponent implements OnInit {
  showPassword: boolean = false;


  constructor(private headerTitle: AppService) { }

  ngOnInit(): void {
    this.headerTitle.setTitle('Manage Sub Admins');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
