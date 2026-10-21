import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ProfileService } from 'src/app/content/core/services/profile/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  
  editProfileForm:FormGroup;
  fileToUpload: File;
  profileData:any=[];
  fileValue:string;
  constructor(private headerTitle: AppService,private router : Router, private active: ActivatedRoute,
    private toastr: ToastrService, private fb: FormBuilder, private profileService:ProfileService,
    private commonService:AppService) { }

  ngOnInit() {
    this.headerTitle.setTitle('Profile');
    this.initForm();
    this.getProfile();
  }
  initForm(): void {
    this.editProfileForm = this.fb.group(
      {
        full_name: ['', Validators.required],
        email: ['', [Validators.required,Validators.pattern(environment.emailRegex)]],
        image_upload:['',Validators.required]

      });
  }

  getProfile() {
    this.profileService.getProfile().subscribe((result: any) => {
      if(result.status == 200){
       this.profileData  =  result.data[0];
       this.editProfileForm = this.fb.group({
        full_name: [this.profileData.full_name, Validators.required],
        email: [this.profileData.email, [Validators.required,Validators.pattern(environment.emailRegex)]],
        image_upload:[this.profileData.profile_pic,Validators.required]
      });
      }
     })
  }
  selectFile(filesList: FileList) {
    var reader = new FileReader();
    const fileToUpload = filesList.item(0);
    reader.readAsDataURL(fileToUpload);
    if( fileToUpload.size > 1024 * 1024 ){
      this.toastr.error(
        'Upload image of size less than 1 mb'
       );
     } else {
      reader.onload = () => {
      };
      this.fileToUpload = fileToUpload;
      if (this.fileToUpload.type == 'image/jpeg' || this.fileToUpload.type == 'image/png' || this.fileToUpload.type == 'image/jpg') {
        this.uploadFile(this.fileToUpload)
      } else {
        this.toastr.error("Invalid file type");
      }
     }
  }
  uploadFile(file) {
     this.profileService.upload(file).subscribe( (res: any) => {
      this.fileValue = res.data[0].name;
      this.editProfileForm.patchValue({
        image_upload:  this.fileValue,
      });
    });
  }

  imageUrl(imgUrl): string {
    if(imgUrl == '' || imgUrl == null){
      return 'assets/images/dummyuser-image.svg'
    }
    else{
      return this.commonService.imagePath(imgUrl);
    }
  }


  goToBack() {
    this.router.navigate(['/pages/profile'])
  }
  upadateProfile() {
    let body = {
      "full_name": this.editProfileForm.value.full_name,
      "email":  this.editProfileForm.value.email,
      "profile_pic":this.fileValue
    }
    this.profileService.updateProfile(body).subscribe((res:any)=>{
      this.toastr.success(res.data.message);
        this.editProfileForm.reset();
        this.router.navigate(['/pages/profile']);
        this.router.onSameUrlNavigation = 'reload';
      
     });
  }

}
