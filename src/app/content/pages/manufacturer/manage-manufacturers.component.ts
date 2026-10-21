import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppService } from 'src/app/content/core/services/common/app.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManufacturerService } from '../../core/services/manufacturer/manufacturer.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-manage-manufacturers',
  templateUrl: './manage-manufacturers.component.html',
  styleUrls: ['./manage-manufacturers.component.scss']
})
export class ManageManufacturersComponent implements OnInit {
  items: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchName: string = '';
  filter: number = 0;
  statusValue: number;
  role: number;
  count: number;
  closeResult: string = '';
  addManufacturerForm: FormGroup;
  id: number;
  name: string;
  deleteId:number;
  searchField: FormControl = new FormControl('');
  search = "";
  @ViewChild('addNewManufacturerModal') templateRefAddManufacturer: TemplateRef<any>;
  @ViewChild('deleteManufracrtureModal') templateRefdeleteManufacturer: TemplateRef<any>;

  constructor(private headerTitle: AppService, private manufacturerService: ManufacturerService,
    private toastr: ToastrService, private router: Router, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.headerTitle.setTitle('Manage Manufacturers');
    this.initForm();
    this.manufacturerList(this.currentPage,this.search);
    this.searchField.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe((search) => {
      this.currentPage = 1;
      this.manufacturerList(this.currentPage, search);
    })
  }

  initForm(): void {
    this.addManufacturerForm = this.fb.group(
      {
        name: ['', Validators.required],
      });
  }

  manufacturerList(page,search) {
    this.manufacturerService.searchUser(search, page, this.itemsPerPage, this.filter).subscribe((result: any) => {
      if (result.status == 200) {
        this.items = result.data.results;
        this.count = result.data.count;
      }
    });
  }

  onPageChange(pageNumber: number,search:any): void {
    this.currentPage = pageNumber;
    this.manufacturerList(this.currentPage,search);
  }
  getShownEntriesRange(): string {
    const startRange = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endRange = Math.min(this.currentPage * this.itemsPerPage, this.count);
    return `${startRange} - ${endRange}`;
  }


  filterForStatus(event,search) {
    const value = event == "" ? "" : event;
    this.currentPage = 1;
    this.filter = value;
    this.manufacturerList(this.currentPage,search);
  }
  goToView(id) {
    this.router.navigate(['/pages/manufacturer-detail'], { queryParams: { id: id } });
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

  hideAddModal() {
    this.modalService.dismissAll();
    this.addManufacturerForm.reset();
  }

  openAddCompanyModel(role) {
    this.role = role;
    this.open(this.templateRefAddManufacturer);
  }

  opendeleteCompanyModel(id) {
    this.deleteId = id;
    this.open(this.templateRefdeleteManufacturer);
  }

  openeditCompanyModel(role, id, name) {
    this.role = role;
    this.id = id;
    this.name = name;
    this.addManufacturerForm.controls['name'].setValue(this.name)
    this.open(this.templateRefAddManufacturer);
  }

  addData() {
    const body = {
      "manufacturer_name": this.addManufacturerForm.controls.name.value
    }
    this.manufacturerService.addManufacturer(body).subscribe((res:any) => {
      this.toastr.success(res.data.message);
      this.hideAddModal();
      this.manufacturerList(this.currentPage,this.search);
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
      this.manufacturerList(this.currentPage,this.search);
    })

  }

  deleteManufacturer() {
    this.manufacturerService.delete(this.deleteId).subscribe((res:any) => {
      this.toastr.success(res.data.message);
      this.modalService.dismissAll();
      this.searchField.setValue('');
      this.manufacturerList(this.currentPage,this.search);
    })

  }

  hideDeleteModal() {
    this.modalService.dismissAll();
  }

}
