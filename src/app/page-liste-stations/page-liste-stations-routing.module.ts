import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageListeStationsPage } from './page-liste-stations.page';

const routes: Routes = [
  {
    path: '',
    component: PageListeStationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageListeStationsPageRoutingModule {}
