import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageSystemComponent } from './manage-system.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ManageSystemComponent,
  }
];



@NgModule({
  declarations: [ManageSystemComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageSystemModule { }
