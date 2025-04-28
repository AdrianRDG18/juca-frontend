import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule) },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then( m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'no-page-found', loadChildren: () => import('./pages/no-page/no-page.module').then( m => m.NoPageModule) },
  { path: '**', redirectTo: 'no-page-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
