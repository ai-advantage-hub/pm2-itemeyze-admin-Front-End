import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'manage-users',
        loadChildren: () => import('./user/manage-users/manage-users.module').then(m => m.ManageUsersModule)
      },
      {
        path: 'manage-users-request',
        loadChildren: () => import('./user/manage-users-request/manage-users-request.module').then(m => m.ManageUsersRequestModule)
      },
      {
        path: 'manage-users-view-profile',
        loadChildren: () => import('./user/manage-users-view-profile/manage-users-view-profile.module').then(m => m.ManageUsersViewProfileModule)
      },
      {
        path: 'manage-users-view-project',
        loadChildren: () => import('./user/manage-users-view-project/manage-users-view-project.module').then(m => m.ManageUsersViewProjectModule)
      },
      {
        path: 'manage-users-project-details',
        loadChildren: () => import('./user/manage-users-project-details/manage-users-project-details.module').then(m => m.ManageUsersProjectDetailsModule)
      },
      {
        path: 'manage-sub-admins',
        loadChildren: () => import('./sub-admin/manage-sub-admins/manage-sub-admins.module').then(m => m.ManageSubAdminsModule)
      },
      {
        path: 'manage-sub-admins-add',
        loadChildren: () => import('./sub-admin/manage-sub-admins-add/manage-sub-admins-add.module').then(m => m.ManageSubAdminsAddModule)
      },
      {
        path: 'manage-sub-admins-edit',
        loadChildren: () => import('./sub-admin/manage-sub-admins-edit/manage-sub-admins-edit.module').then(m => m.ManageSubAdminsEditModule)
      },
      {
        path: 'manage-sub-admins-view',
        loadChildren: () => import('./sub-admin/manage-sub-admins-view/manage-sub-admins-view.module').then(m => m.ManageSubAdminsViewModule)
      },
      {
        path: 'manage-projects',
        loadChildren: () => import('./projects/manage-projects/manage-projects.module').then(m => m.ManageProjectsModule)
      },
      {
        path: 'manage-projects-view-project',
        loadChildren: () => import('./projects/manage-projects-view-project/manage-projects-view-project.module').then(m => m.ManageProjectsViewProjectModule)
      },
      {
        path: 'manage-projects-add-project',
        loadChildren: () => import('./projects/manage-projects-add-project/manage-projects-add-project.module').then(m => m.ManageProjectsAddProjectModule)
      },
      {
        path: 'manage-projects-file-request',
        loadChildren: () => import('./file/manage-projects-file-request/manage-projects-file-request.module').then(m => m.ManageProjectsFileRequestModule)
      },
      {
        path: 'manage-projects-file-request-details',
        loadChildren: () => import('./file/manage-projects-file-request-details/manage-projects-file-request-details.module').then(m => m.ManageProjectsFileRequestDetailsModule)
      },
      {
        path: 'manage-projects-project-request',
        loadChildren: () => import('./projects/manage-projects-project-request/manage-projects-project-request.module').then(m => m.ManageProjectsProjectRequestModule)
      },
      {
        path: 'manage-projects-add-file',
        loadChildren: () => import('./file/manage-projects-add-file/manage-projects-add-file.module').then(m => m.ManageProjectsAddFileModule)
      },
      {
        path: 'manage-projects-deleted-projects',
        loadChildren: () => import('./delete-projects/manage-projects-deleted-projects/manage-projects-deleted-projects.module').then(m => m.ManageProjectsDeletedProjectsModule)
      },
      {
        path: 'manage-projects-deleted-files',
        loadChildren: () => import('./delete-projects/manage-projects-deleted-files/manage-projects-deleted-files.module').then(m => m.ManageProjectsDeletedFilesModule)
      },
      {
        path: 'manage-projects-deleted-files-edit',
        loadChildren: () => import('./file/manage-project-deleted-file-edit-details/manage-project-deleted-file-edit-details.module').then(m => m.ManageProjectDeletedFileEditDetailsModule)
      },
      {
        path: 'manage-projects-file-bin',
        loadChildren: () => import('./delete-projects/manage-projects-file-bin/manage-projects-file-bin.module').then(m => m.ManageProjectsFileBinModule)
      },
      {
        path: 'manage-projects-mark-deletion',
        loadChildren: () => import('./delete-projects/manage-projects-mark-deletion/manage-projects-mark-deletion.module').then(m => m.ManageProjectsMarkDeletionModule)
      },
      {
        path: 'manage-companies',
        loadChildren: () => import('./company/manage-companies/manage-companies.module').then(m => m.ManageCompaniesModule)
      },
      {
        path: 'manage-content',
        loadChildren: () => import('./manage-content/manage-content.module').then(m => m.ManageContentModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'edit-profile',
        loadChildren: () => import('./profile/edit-profile/edit-profile.module').then(m => m.EditProfileModule)
      },
      {
        path: 'change-password',
        loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule)
      },
      {
        path: 'manufacturer',
        loadChildren: () => import('./manufacturer/manage-manufacturers.module').then(m => m.ManageManufacturersModule)
      },
      {
        path: 'manufacturer-detail',
        loadChildren: () => import('./manufacturer/detail/detail.module').then(m => m.DetailModule)
      },
      {
        path: 'manage-system',
        loadChildren: () => import('./manage-system/manage-system.module').then(m => m.ManageSystemModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
