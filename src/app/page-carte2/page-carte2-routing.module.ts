import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageCarte2Page } from './page-carte2.page';

const routes: Routes = [
  {
    path: '',
    component: PageCarte2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageCarte2PageRoutingModule {}
