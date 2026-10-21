import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageSubAdminsEditComponent } from './manage-sub-admins-edit.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ManageSubAdminsEditComponent,
  }
];



@NgModule({
  declarations: [ManageSubAdminsEditComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageSubAdminsEditModule { }