import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageProjectsDeletedProjectsComponent } from './manage-projects-deleted-projects.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ManageProjectsDeletedProjectsComponent,
  }
];



@NgModule({
  declarations: [ManageProjectsDeletedProjectsComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageProjectsDeletedProjectsModule { }
