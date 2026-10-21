import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersViewProjectComponent } from './manage-users-view-project.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ManageUsersViewProjectComponent,
  }
];




@NgModule({
  declarations: [ManageUsersViewProjectComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageUsersViewProjectModule { }