import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/services/common/app.service';
import { ProfileService } from '../../core/services/profile/profile.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  data: any = [];

  constructor(private headerTitle: AppService, private profileService: ProfileService,
    private commonService: AppService, private router: Router, private toastr: ToastrService,) { }

  ngOnInit() {
    this.headerTitle.setTitle('Profile');
    this.profileData();
  }
  profileData() {
    this.profileService.getProfile().subscribe((result: any) => {
      if (result.status == 200) {
        this.data = result.data[0];
        this.commonService.setProfileData(this.data);
      }
    });
  }

  imagePath(imgUrl): string {
    if (imgUrl == '' || imgUrl == null) {
      return 'assets/images/dummyuser-image.svg'
    }
    else {
      return this.commonService.imagePath(imgUrl);
    }
  }



}
