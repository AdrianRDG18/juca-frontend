import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    NoPageFoundComponent,
    UsersComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    TranslateModule
  ]
})
export class PagesModule { }
