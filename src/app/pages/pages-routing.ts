import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { canMatch, isAuthGuard } from '../guards/is-auth.guard';

const routes: Routes = [
  { path: 'dashboard',
    component: PagesComponent,
    canActivate: [ isAuthGuard ],
    canMatch: [ canMatch ],
    loadChildren: () => import('./child-pages-routes.module').then(module => module.ChildPagesRoutesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
