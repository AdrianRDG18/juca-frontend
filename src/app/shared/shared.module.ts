import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { TableImageComponent } from './table-image/table-image.component';

@NgModule({
  declarations: [
    LanguageSelectorComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    FooterComponent,
    TableImageComponent,
  ],
  exports: [
    LanguageSelectorComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    FooterComponent,
    TableImageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule.forChild()
  ]
})
export class SharedModule{}
