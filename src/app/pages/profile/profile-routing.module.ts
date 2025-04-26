import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { PasswordComponent } from './password/password.component';

const routes: Routes = [
  { path: 'personal-info', component: PersonalInfoComponent },
  { path: 'password', component: PasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
