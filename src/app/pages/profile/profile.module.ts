import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { PasswordComponent } from './password/password.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PersonalInfoComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
