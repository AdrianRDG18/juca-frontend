import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoPageRoutingModule } from './no-page-routing.module';
import { NoPageFoundComponent } from './no-page.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NoPageFoundComponent
  ],
  imports: [
    CommonModule,
    NoPageRoutingModule,
    TranslateModule.forChild()
  ]
})
export class NoPageModule { }
