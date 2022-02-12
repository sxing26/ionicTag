import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageCarte2PageRoutingModule } from './page-carte2-routing.module';

import { PageCarte2Page } from './page-carte2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageCarte2PageRoutingModule
  ],
  declarations: [PageCarte2Page]
})
export class PageCarte2PageModule {}
