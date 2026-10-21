import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageContentComponent } from './manage-content.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

const routes: Routes = [
  {
    path: '',
    component: ManageContentComponent,
  }
];




@NgModule({
  declarations: [ManageContentComponent],
  imports: [
    CommonModule,
    FormsModule,
     ReactiveFormsModule,
     QuillModule.forRoot(),
    RouterModule.forChild(routes)
  ]
})
export class ManageContentModule { }
