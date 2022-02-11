import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripsearchPage } from './tripsearch.page';

const routes: Routes = [
  {
    path: '',
    component: TripsearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripsearchPageRoutingModule {}
