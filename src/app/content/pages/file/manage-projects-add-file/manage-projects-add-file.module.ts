import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageProjectsAddFileComponent } from './manage-projects-add-file.component';
import { Routes, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    component: ManageProjectsAddFileComponent,
  }
];



@NgModule({
  declarations: [ManageProjectsAddFileComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    MatSelectModule,
    MatInputModule ,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule, 
    ReactiveFormsModule,
    NgSelectModule ,
    RouterModule.forChild(routes)
  ]
})
export class ManageProjectsAddFileModule { }
