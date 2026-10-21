import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/services/common/app.service';
import { Router } from '@angular/router';
import { ContentService } from '../../core/services/content/content.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-manage-content',
  templateUrl: './manage-content.component.html',
  styleUrls: ['./manage-content.component.scss']
})
export class ManageContentComponent implements OnInit{
  displayText: string ;
  text: any = [];
  type: any;
  selectedButton: number;
  show:boolean = true;
  ContentValue:string;
  updateValue:boolean = true;
  contentForm:FormGroup;

  constructor(private headerTitle: AppService,
    private manageContent: ContentService, 
    private router: Router,private toastr: ToastrService,
    private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.headerTitle.setTitle('Manage Content');
    this.fetchData(1);
    this.selectedButton = 1;
    this.initForm();
  }
  initForm(): void {
    this.contentForm = this.formBuilder.group(
      {
        ContentValue: ['', [Validators.required]],
      }
    );
  }

  selectButton(value): void {
    this.selectedButton = value;
    if(value == 1){
      this.fetchData(1);
      this.show = true;
      this.updateValue = true;
    }else {
      this.fetchData(2);
      this.show = true;
      this.updateValue = false;
    }
  }

  fetchData(type: number) {
    this.manageContent.getTermsAndAboutData(type).subscribe((result: any) => {
      this.displayText = result.data[0].content;
      this.ContentValue =this.displayText;
      this.contentForm= this.formBuilder.group({
        ContentValue: [this.ContentValue, [Validators.required]]
      });
    })
  }
  contentUpdate(type) {
    const updatedContent = {
      type: type,
      content: this.contentForm.controls.ContentValue.value
    }
    this.manageContent.updateTermsAndAboutData(updatedContent).subscribe((result: any) => {
      this.toastr.success(result.data.message);
      this.fetchData(type);
      this.show =true;
    })
  }
  changeValue(value){
    if(value == 1) {
      this.show = false;
    }else {
      this.show = true;
    }

  }
  clear(type){
    this.show =true;
    this.fetchData(type);
  }

}
