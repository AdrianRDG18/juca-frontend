import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { canMatch, isAuthGuard } from '../guards/is-auth.guard';

const routes: Routes = [
  { path: '', // 'dasboard' route loaded from app.component
    component: PagesComponent,
    canActivate: [ isAuthGuard ],
    canMatch: [ canMatch ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
