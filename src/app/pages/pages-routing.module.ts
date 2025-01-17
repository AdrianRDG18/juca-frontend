import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { isAuthGuard } from '../guards/is-auth.guard';

const routes: Routes = [
  { path: 'dashboard',
    canActivate: [ isAuthGuard ],
    component: PagesComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
