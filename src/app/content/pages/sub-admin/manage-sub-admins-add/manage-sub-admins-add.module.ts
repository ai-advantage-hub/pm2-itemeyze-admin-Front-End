import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageSubAdminsAddComponent } from './manage-sub-admins-add.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ManageSubAdminsAddComponent,
  }
];



@NgModule({
  declarations: [ManageSubAdminsAddComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageSubAdminsAddModule { }