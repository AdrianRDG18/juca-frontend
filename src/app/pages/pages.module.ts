import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PagesComponent,
    NoPageFoundComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
