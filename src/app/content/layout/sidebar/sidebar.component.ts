import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../core/services/common/app.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  selectedButton: number = 1;
  url: string;
  data: any;
  role: number;
  ManageUsers: boolean = false;
  ManageContent: boolean = false;
  ManageProjects: boolean = false;
  ManageCompanies: boolean = false;
  ManageManufacturers: boolean = false;

  constructor(private route: Router, private commonService: AppService) {
    this.commonService.sideBar.subscribe(sideData => {
      if (sideData == '2') {
        this.selectedButton = null;
      }
    });
  }

  ngOnInit(): void {
    this.role = JSON.parse(localStorage.getItem('role'));
    this.data = JSON.parse(localStorage.getItem('modules') || "[]");
    this.url = this.route.url;
    if (this.role == 3) {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i] == "Manage Users") {
          this.ManageUsers = true;
        } else if (this.data[i] == "Manage Projects") {
          this.ManageProjects = true;
          // this.selectedButton = 4;
        } else if (this.data[i] == "Manage Companies") {
          this.ManageCompanies = true;
          // this.selectedButton = 5;
        } else if (this.data[i] == "Manage Content") {
          this.ManageContent = true;
          // this.selectedButton = 6;
        }
        // else if(this.data[i] == "Manage Manufacturers") {
        //   this.ManageManufacturers = true;
        //   this.selectedButton = 6;
        // }

      }
      if (this.url === '/pages/manage-users' ||
        this.url.includes('/pages/manage-users-request') ||
        this.url.includes('/pages/manage-users-view-profile') ||
        this.url.includes('/pages/manage-users-view-project') ||
        this.url.includes('/pages/manage-users-project-details')) {
        this.selectedButton = 2;
      }
      else if (this.url.includes('/pages/manage-projects') ||
        this.url.includes('/pages/manage-projects-add-file') ||
        this.url.includes('/pages/manage-projects-add-project') ||
        this.url.includes('/pages/manage-projects-deleted-files') ||
        this.url.includes('/pages/manage-projects-deleted-projects') ||
        this.url.includes('/pages/manage-projects-edit-file') ||
        this.url.includes('/pages/manage-projects-file-request') ||
        this.url.includes('/pages/manage-projects-file-request-details') ||
        this.url.includes('/pages/manage-projects-project-request') ||
        this.url.includes('/pages/manage-projects-view-file') ||
        this.url.includes('/pages/manage-projects-file-bin') ||
        this.url.includes('/pages/manage-projects-mark-deletion') ||
        this.url.includes('/pages/manage-projects-view-project')) {
        this.selectedButton = 4;
      }
      else if (this.url === '/pages/manage-companies') {
        this.selectedButton = 5;
      }
      else if (this.url === '/pages/manage-content') {
        this.selectedButton = 6;
      }
      else if (this.url === '/pages/profile' ||
        this.url.includes('/pages/edit-profile') ||
        this.url.includes('/pages/change-password')) {
        this.selectedButton = null;
      }

    }
    else {
      if (this.url === '/pages/dashboard') {
        this.selectedButton = 1;
      }
      else if (this.url === '/pages/manage-users' ||
        this.url.includes('/pages/manage-users-request') ||
        this.url.includes('/pages/manage-users-view-profile') ||
        this.url.includes('/pages/manage-users-view-project') ||
        this.url.includes('/pages/manage-users-project-details')) {
        this.selectedButton = 2;
      }
      else if (this.url === '/pages/manage-sub-admins' ||
        this.url.includes('/pages/manage-sub-admins-add') ||
        this.url.includes('/pages/manage-sub-admins-edit') ||
        this.url.includes('/pages/manage-sub-admins-view')) {
        this.selectedButton = 3;
      }
      else if (this.url.includes('/pages/manage-projects') ||
        this.url.includes('/pages/manage-projects-add-file') ||
        this.url.includes('/pages/manage-projects-add-project') ||
        this.url.includes('/pages/manage-projects-deleted-files') ||
        this.url.includes('/pages/manage-projects-deleted-projects') ||
        this.url.includes('/pages/manage-projects-edit-file') ||
        this.url.includes('/pages/manage-projects-file-request') ||
        this.url.includes('/pages/manage-projects-file-request-details') ||
        this.url.includes('/pages/manage-projects-project-request') ||
        this.url.includes('/pages/manage-projects-view-file') ||
        this.url.includes('/pages/manage-projects-file-bin') ||
        this.url.includes('/pages/manage-projects-mark-deletion') ||
        this.url.includes('/pages/manage-projects-view-project')) {
        this.selectedButton = 4;
      }
      else if (this.url === '/pages/manage-companies') {
        this.selectedButton = 5;
      }
      else if (this.url === '/pages/manage-content') {
        this.selectedButton = 6;
      }
      else if (this.url === '/pages/manufacturer' || this.url.includes('/pages/manufacturer-detail')) {
        this.selectedButton = 7;
      }
      else if (this.url === '/pages/manage-system') {
        this.selectedButton = 8;
      }
      else if (this.url === '/pages/profile' ||
        this.url.includes('/pages/edit-profile') ||
        this.url.includes('/pages/change-password')) {
        this.selectedButton = null;
      }

    }
  }

  selectButton(buttonNumber: number): void {
    this.selectedButton = buttonNumber;
  }

}
