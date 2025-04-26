import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFoundComponent } from './no-page.component';

const routes: Routes = [
  { path: '', component: NoPageFoundComponent } // no-page-found route from app.component with lazy load
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoPageRoutingModule { }
