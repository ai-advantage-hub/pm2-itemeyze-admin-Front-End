import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersProjectDetailsComponent } from './manage-users-project-details.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ManageUsersProjectDetailsComponent,
  }
];




@NgModule({
  declarations: [ManageUsersProjectDetailsComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageUsersProjectDetailsModule { }
