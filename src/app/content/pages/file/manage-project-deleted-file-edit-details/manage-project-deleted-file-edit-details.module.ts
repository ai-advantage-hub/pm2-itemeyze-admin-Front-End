import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ManageProjectDeletedFileEditDetailsComponent } from './manage-project-deleted-file-edit-details.component';

const routes: Routes = [
  {
    path: '',
    component: ManageProjectDeletedFileEditDetailsComponent,
  }
];


@NgModule({
  declarations: [ManageProjectDeletedFileEditDetailsComponent],
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
export class ManageProjectDeletedFileEditDetailsModule { }
