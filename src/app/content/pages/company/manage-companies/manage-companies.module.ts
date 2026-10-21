import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageCompaniesComponent } from './manage-companies.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  {
    path: '',
    component: ManageCompaniesComponent,
  }
];




@NgModule({
  declarations: [ManageCompaniesComponent],
  imports: [
    CommonModule,
    NgxPaginationModule ,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgSelectModule
  ]
})
export class ManageCompaniesModule { }
