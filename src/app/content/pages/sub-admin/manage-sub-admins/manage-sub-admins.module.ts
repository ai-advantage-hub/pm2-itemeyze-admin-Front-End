import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageSubAdminsComponent } from './manage-sub-admins.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component:ManageSubAdminsComponent,
  }
];



@NgModule({
  declarations: [ManageSubAdminsComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageSubAdminsModule { }
