import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
  { path: 'users', component: UsersComponent, data: { title: 'Users'} },
  { path: 'account-settings', component: SettingsComponent, data: { title: 'Settings'} },
  { path: 'profile', component: ProfileComponent, data: { title: 'My profile' } }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildPagesRoutesModule { }
