import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageListeLignesPage } from './page-liste-lignes.page';

const routes: Routes = [
  {
    path: '',
    component: PageListeLignesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageListeLignesPageRoutingModule {}
