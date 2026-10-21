import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageProjectsAddProjectComponent } from './manage-projects-add-project.component';
import { Routes, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';


const routes: Routes = [
  {
    path: '',
    component: ManageProjectsAddProjectComponent,
  }
];



@NgModule({
  declarations: [ManageProjectsAddProjectComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgSelectModule
  ]
})
export class ManageProjectsAddProjectModule { }
