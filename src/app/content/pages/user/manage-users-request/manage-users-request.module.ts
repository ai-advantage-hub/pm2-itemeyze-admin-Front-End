import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersRequestComponent } from './manage-users-request.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  {
    path: '',
    component: ManageUsersRequestComponent,
  }
];




@NgModule({
  declarations: [ManageUsersRequestComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule, 
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageUsersRequestModule { }
