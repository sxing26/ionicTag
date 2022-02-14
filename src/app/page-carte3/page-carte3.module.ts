import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageCarte3PageRoutingModule } from './page-carte3-routing.module';

import { PageCarte3Page } from './page-carte3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageCarte3PageRoutingModule
  ],
  declarations: [PageCarte3Page]
})
export class PageCarte3PageModule {}
