import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmailSentComponent } from './email-sent.component';

const routes: Routes = [
  {
    path: '',
    component: EmailSentComponent,
  }
];



@NgModule({
  declarations: [
   EmailSentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
     FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class EmailSentModule { }
