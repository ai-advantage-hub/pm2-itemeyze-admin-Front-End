import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ManageProjectsService } from 'src/app/content/core/services/manage-projects/manage-projects.service';
import { ProfileService } from 'src/app/content/core/services/profile/profile.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-manage-projects-add-file',
  templateUrl: './manage-projects-add-file.component.html',
  styleUrls: ['./manage-projects-add-file.component.scss'],
})
export class ManageProjectsAddFileComponent implements OnInit {
  @Input() quantity: number = 0;

  id: number;
  role: number;
  addFileForm: FormGroup;
  fileToUpload: File;
  fileValue: string;
  image_name: string;
  show: boolean = false;
  fileId: number;
  data: any = [];
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  manufacturerArr: any = [];
  searchInput$ = new Subject<string>();
  selectedOption: any = null;
  manuName: any;
  profiledata: any;

  constructor(
    private headerTitle: AppService,
    private projectService: ManageProjectsService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private commonService: AppService,
    private _location: Location
  ) {
    this.route.queryParams.subscribe((params) => {
      this.fileId = params.fileId;
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.getFromParams();
    this.manufacturerList();
    this.headerTitle.setTitle('Manage Projects');
  }

  getFromParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params.id;
      this.role = params.role;
      if (params.fileId) {
        this.fileId = params.fileId;
      }
      if (this.role == 2) {
        this.getFileData();
      } else {
        this.generateValue(7);
      }
    });
  }
  initForm(): void {
    this.fileCreatorDetail(this.id);
    this.addFileForm = this.fb.group({
      thumbnail: [''],
      manufacturing_number: [''],
      manufacturer_name: [''],
      ipn: [''],
      manual_manufacturer_name: [''],
      file_name: [''],
      quantity: [0],
      project_details: [''],
      additional_details: [''],
      // recording: [''],
      location: ['', Validators.required],
      location_points: [null],
      full_name: [''],
    });
  }
  onSearch(term) {

    var name = term.term;
    if (name !== null) {
      const foundOption = this.manufacturerArr.find(
        (option) => option.name.toLowerCase() === name.toLowerCase()
      );
      if (!foundOption) {
        this.addFileForm.controls['manual_manufacturer_name'].setValue(name);
        this.addFileForm.controls['manufacturer_name'].setValue(name);
      } else if (foundOption) {
        this.addFileForm.controls['manufacturer_name'].setValue(name);
      }
    }
  }

  backToDetail() {
    this._location.back();
    // this.router.navigate(['/pages/manage-projects-view-project'], { queryParams: { id: this.id } });
  }

  selectFile(filesList: FileList) {
    var reader = new FileReader();
    const fileToUpload = filesList.item(0);
    reader.readAsDataURL(fileToUpload);
    if (fileToUpload.size > 1024 * 1024) {
      this.toastr.error('Upload image of size less than 1 mb');
    } else {
      reader.onload = () => { };
      this.fileToUpload = fileToUpload;
      if (
        this.fileToUpload.type == 'image/jpeg' ||
        this.fileToUpload.type == 'image/png' ||
        this.fileToUpload.type == 'image/jpg'
      ) {
        this.uploadFile(this.fileToUpload);
      } else {
        this.toastr.error('Invalid file type');
      }
    }
  }

  uploadFile(file) {
    this.profileService.upload(file).subscribe((res: any) => {
      this.fileValue = res.data[0].url;
      this.addFileForm.patchValue({
        thumbnail: res.data[0].name,
      });
      this.show = true;
    });
  }

  getUrl(imgUrl): string {
    if (imgUrl == '' || imgUrl == null) {
      return 'assets/images/default-img.svg';
    } else {
      const parts = imgUrl.split('/');
      const desiredPart = 'image/' + parts[parts.length - 1];
      const part2 = desiredPart.split('?');
      return this.commonService.imagePath(part2[0]);
    }
  }

  increment() {
    this.addFileForm.value.quantity++;
    this.addFileForm.patchValue({
      quantity: this.addFileForm.value.quantity,
    });
  }

  decrement() {
    if (this.addFileForm.value.quantity > 0) {
      this.addFileForm.value.quantity--;
      this.addFileForm.patchValue({
        quantity: this.addFileForm.value.quantity,
      });
    }
  }

  updateQuantity() {
    if (this.quantity < 0 || isNaN(this.quantity)) {
      this.quantity = 0;
      this.addFileForm.patchValue({
        quantity: this.quantity,
      });
    }
  }

  createFile() {
    // this.addFileForm.controls.full_name.setValue(this.profiledata?.full_name)
    const body = {
      project_id: Number(this.id),
      thumbnail: this.fileValue,
      file_name: this.addFileForm.value.file_name,
      manufacturing_number: this.addFileForm.value.manufacturing_number,
      manufacturer_name: this.addFileForm.value.manufacturer_name,
      ipn: this.addFileForm.value.ipn,
      manual_manufacturer_name: this.addFileForm.value.manual_manufacturer_name,
      quantity: Number(this.addFileForm.value.quantity),
      project_details: this.addFileForm.value.project_details,
      additional_details: this.addFileForm.value.additional_details,
      recording: '',
      location: this.addFileForm.value.location,
      location_points: null,
      // full_name:this.profiledata?.full_name
    };
    this.projectService.addFile(body).subscribe((result: any) => {
      // this.toastr.success(this.addFileForm.value.file_name+" "+result.data.message);
      this.toastr.success(result.data.message);
      this.router.navigate(['/pages/manage-projects-view-project'], {
        queryParams: { id: this.id },
      });
    });
  }

  getFileData() {
    if (!this.fileId) {
      return;
    }
    this.projectService.getFileDetail(this.fileId).subscribe((result: any) => {
      if (result.status == 200) {
        this.data = result.data[0];
        if (this.data.file_name != null) {
          this.show = true;
        }
        this.quantity = this.data.quantity;
        if (this.data.manufacturer_name == null) {
          this.manuName = this.data.name_manufacturer;
        } else {
          this.manuName = this.data.manufacturer_name;
        }
        this.addFileForm.patchValue({
          thumbnail: this.data.thumbnail,
          file_name: this.data.file_name,
          manufacturing_number: this.data.manufacturing_number,
          ipn: this.data.ipn,
          manufacturer_name: this.manuName,
          quantity: this.data.quantity,
          project_details: this.data.project_details,
          additional_details: this.data.additional_details,
          // recording: "",
          location: this.data.location,
          location_points: this.data.location_points,
        });
      }
    });
  }

  updateFile() {
    // return
    this.addFileForm.controls.full_name.setValue(this.profiledata?.full_name);
    // if (isNaN(this.addFileForm.value.manufacturer_name)) {
    //   var body = {
    //     thumbnail: this.fileValue ? this.fileValue : this.addFileForm.value.thumbnail,
    //     manufacturing_number: this.addFileForm.value.manufacturing_number,
    //     manufacturer_name: null,
    //     manual_manufacturer_name: this.addFileForm.value.manufacturer_name,
    //     quantity: this.addFileForm.value.quantity,
    //     project_details: this.addFileForm.value.project_details,
    //     additional_details: this.addFileForm.value.additional_details,
    //     // recording: "",
    //     location: this.addFileForm.value.location,
    //     location_points: null,
    //     full_name:this.addFileForm.value.full_name,
    //   }
    // } else {
    var body = {
      thumbnail: this.fileValue
        ? this.fileValue
        : this.addFileForm.value.thumbnail,
      manufacturing_number: this.addFileForm.value.manufacturing_number,
      manufacturer_name: this.addFileForm.value.manufacturer_name,
      ipn: this.addFileForm.value.ipn,
      manual_manufacturer_name: this.addFileForm.value.manual_manufacturer_name,
      quantity: this.addFileForm.value.quantity,
      project_details: this.addFileForm.value.project_details,
      additional_details: this.addFileForm.value.additional_details,
      // recording: "",
      location: this.addFileForm.value.location,
      location_points: null,
      full_name: this.addFileForm.value.full_name,
    };
    // }

    this.projectService
      .updateFile(this.fileId, body)
      .subscribe((result: any) => {
        this.toastr.success(
          this.addFileForm.value.file_name + ' ' + result.data.message
        );
        this.router.navigate(['/pages/manage-projects-view-project'], {
          queryParams: { id: this.id },
        });
      });
  }
  removePhoto() {
    this.fileValue = '';
    this.show = false;
    this.toastr.success('Image is removed');
  }
  generateValue(length) {
    let string = ' ';
    const charactersLength = this.characters.length;
    for (let i = 0; i < length; i++) {
      string += this.characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    this.image_name = this.id + '_' + string;
    this.addFileForm.patchValue({
      file_name: this.image_name,
    });
  }

  manufacturerList() {
    this.projectService.maufacturerName().subscribe((res: any) => {
      this.manufacturerArr = res.data;
    });
  }
  checkInput(event: KeyboardEvent, value) {
    if (value == 2) {
      const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const inputChar = event.key;
      if (allowedKeys.indexOf(inputChar) === -1) {
        event.preventDefault(); // Prevent the default action if the entered character is not a number
      }
    } else {
      const inputElement = event.target as HTMLInputElement;
      const inputValue = inputElement.value;
      const maxLength = 60;
      if (inputValue.length >= maxLength) {
        event.preventDefault();
        return false;
      }
      return true;
    }
  }

  fileCreatorDetail(id: any) {
    if (!this.fileId) {
      return;
    }
    this.projectService.getFileDetail(this.fileId).subscribe((result: any) => {
      if (result.status == 200) {
        this.profiledata = result.data[0];
      }
    });
  }
}
