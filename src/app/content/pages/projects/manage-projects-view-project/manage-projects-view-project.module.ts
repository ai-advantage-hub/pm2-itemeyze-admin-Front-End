import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageProjectsViewProjectComponent } from './manage-projects-view-project.component';
import { Routes, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: ManageProjectsViewProjectComponent,
  },
];

@NgModule({
  declarations: [ManageProjectsViewProjectComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    NgbModule,
    NgbDatepickerModule,
  ],
})
export class ManageProjectsViewProjectModule {}
