import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManufacturerService } from 'src/app/content/core/services/manufacturer/manufacturer.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  id:number;
  data:any=[];
  closeResult: string = '';
  addManufacturerForm: FormGroup;
  @ViewChild('deleteManufracrtureModal') templateRefdeleteManufacturer: TemplateRef<any>;
  @ViewChild('addNewManufacturerModal') templateRefAddManufacturer: TemplateRef<any>;

  constructor(private headerTitle: AppService,private route:ActivatedRoute, private manufacturerService:ManufacturerService,
    private router:Router,  private toastr: ToastrService, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.headerTitle.setTitle('Manage Manufacturer');
    this.getFromParams();
    this.initForm();
    this.getDetail();
  }

  initForm(): void {
    this.addManufacturerForm = this.fb.group(
      {
        name: ['', Validators.required],
      });
  }
  getFromParams(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
    });
  }

  getDetail(){
    this.manufacturerService.manufacturerDetail(this.id).subscribe((result: any) => {
      if (result.status == 200) {
        this.data = result.data[0];
        this.addManufacturerForm.controls['name'].setValue(this.data.name)
      }
    });
  }

  back() {
    this.router.navigate(['/pages/manufacturer']);
  }

  open(content): void {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'blur-backdrop',
      // backdrop: 'static',
      // keyboard: false
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  opendeleteCompanyModel() {
    this.open(this.templateRefdeleteManufacturer);
  }

  hideAddModal() {
    this.modalService.dismissAll();
    // this.addManufacturerForm.reset();
  }

  openAddCompanyModel() {
    this.open(this.templateRefAddManufacturer);
  }

  deleteManufacturer() {
    this.manufacturerService.delete(this.id).subscribe((res:any) => {
      this.toastr.success(res.data.message);
      this.modalService.dismissAll();
     this.back();
    })

  }

  editData() {
    const body = {
      "id":this.id,
      "new_manufacturer_name": this.addManufacturerForm.controls.name.value
    }
    this.manufacturerService.editManufacturer(body).subscribe((res:any) => {
      this.toastr.success(res.data.message);
      this.hideAddModal();
      this.getDetail();
    })

  }

  hideDeleteModal() {
    this.modalService.dismissAll();
  }

}
