import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ManageUsersViewProfileComponent } from './manage-users-view-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  {
    path: '',
    component: ManageUsersViewProfileComponent,
  }
];




@NgModule({
  declarations: [ManageUsersViewProfileComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgSelectModule
  ]
})
export class ManageUsersViewProfileModule { }
