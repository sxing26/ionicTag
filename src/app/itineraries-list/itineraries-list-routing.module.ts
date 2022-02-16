import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItinerariesListPage } from './itineraries-list.page';

const routes: Routes = [
  {
    path: '',
    component: ItinerariesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItinerariesListPageRoutingModule {}
