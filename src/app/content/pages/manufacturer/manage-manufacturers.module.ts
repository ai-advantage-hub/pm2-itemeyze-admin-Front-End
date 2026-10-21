import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageManufacturersComponent } from './manage-manufacturers.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ManageManufacturersComponent,
  }
];



@NgModule({
  declarations: [ManageManufacturersComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageManufacturersModule { }
