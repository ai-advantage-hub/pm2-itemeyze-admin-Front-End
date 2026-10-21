import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../core/services/common/app.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../core/services/profile/profile.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = '';
  data: any = [];
  constructor(private headerTitle: AppService, private router: Router, private toastr: ToastrService,
    private profileService: ProfileService) { }

  ngOnInit() {
    this.headerTitle.title.subscribe(updatedTitle => {
      this.title = updatedTitle;
    });
    this.headerTitle.profileData.subscribe(updatedData => {
      this.data = updatedData;
      if (this.data == '') {
        this.profileData();
      }
    });
  }
  profileData() {
    this.profileService.getProfile().subscribe((result: any) => {
      if (result.status == 200) {
        this.data = result.data[0];
      }
    })
  }
  goToPassword() {
    this.headerTitle.setSideBar("2");
    this.router.navigate(['/pages/change-password']);
    this.router.onSameUrlNavigation = 'reload';
  }
  goToProfile() {
    this.headerTitle.setSideBar("2");
    this.router.navigate(['/pages/profile']);
    this.router.onSameUrlNavigation = 'reload';
  }
  // logout() {
  //   Swal.fire({
  //     title: 'Are you sure you want to logout?',
  //     showCancelButton: true,
  //     confirmButtonText: `Yes`,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.toastr.success('Logged out successfully!');
  //       localStorage.clear();
  //       this.router.navigate(['/login']);
  //     }
  //   });
  // }

  logout() {
    this.toastr.success('Logged out successfully!');
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  imagePath(imgUrl): string {
    if(imgUrl == '' || imgUrl == null){
      return 'assets/images/dummyuser-image.svg'
    }
    else{
      return this.headerTitle.imagePath(imgUrl);
    }
  }

  isSelectedPath(): boolean {
    // Check the component to determine whether to show the search bar
    const currentRoute = this.router.routerState.snapshot.url;
    return currentRoute.includes('/pages/dashboard') || currentRoute.includes('/pages/manage-content') || currentRoute.includes('/pages/profile');
  }
}
