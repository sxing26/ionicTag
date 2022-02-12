import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageCartePage } from './page-carte.page';

const routes: Routes = [
  {
    path: '',
    component: PageCartePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageCartePageRoutingModule {}
