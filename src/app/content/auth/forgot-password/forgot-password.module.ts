import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
  }
];



@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
     FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ForgotPasswordModule { }
