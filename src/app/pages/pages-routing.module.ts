import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { canMatch, isAuthGuard } from '../guards/is-auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', // 'dasboard' route loaded from app.component
    component: PagesComponent,
    canActivate: [ isAuthGuard ],
    canMatch: [ canMatch ],
    children: [
      { path: '', component: DashboardComponent }, // without lazy load, main content for pages.component.html and /dashboard route
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then( m => m.ProfileModule) },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then( m => m.SettingsModule) },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
