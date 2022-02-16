import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageTrajetPage } from './page-trajet.page';

const routes: Routes = [
  {
    path: '',
    component: PageTrajetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageTrajetPageRoutingModule {}
