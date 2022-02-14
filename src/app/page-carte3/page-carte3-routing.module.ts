import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageCarte3Page } from './page-carte3.page';

const routes: Routes = [
  {
    path: '',
    component: PageCarte3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageCarte3PageRoutingModule {}
