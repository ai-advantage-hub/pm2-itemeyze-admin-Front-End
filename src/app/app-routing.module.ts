import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './content/core/guard/login/login.guard';
import { AuthGuard } from './content/core/guard/auth/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>import('./content/auth/auth.module').then((m) => m.AuthModule),
    // canActivate: [LoginGuard]
  },
  {
    path: 'privacy-policy',
    loadChildren: () =>import('./content/auth/privacy-policy/privacy-policy.module').then((m) => m.PrivacyPolicyModule),
  },
  {
    path: 'pages',
    loadChildren: () =>
    import ('./content/pages/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
