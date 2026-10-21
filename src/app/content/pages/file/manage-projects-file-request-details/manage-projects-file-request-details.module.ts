import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageProjectsFileRequestDetailsComponent } from './manage-projects-file-request-details.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  {
    path: '',
    component: ManageProjectsFileRequestDetailsComponent,
  },
];

@NgModule({
  declarations: [ManageProjectsFileRequestDetailsComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxAudioPlayerModule,
    NgSelectModule,
    RouterModule.forChild(routes),
  ],
})
export class ManageProjectsFileRequestDetailsModule {}
