import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { TableImageComponent } from './table-image/table-image.component';
import { EditUserComponent } from './modals/edit-user/edit-user.component';

@NgModule({
  declarations: [
    LanguageSelectorComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    FooterComponent,
    TableImageComponent,
    EditUserComponent
  ],
  exports: [
    LanguageSelectorComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    FooterComponent,
    TableImageComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ]
})
export class SharedModule{}
