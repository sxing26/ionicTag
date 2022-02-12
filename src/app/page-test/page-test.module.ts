import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageTestPageRoutingModule } from './page-test-routing.module';

import { PageTestPage } from './page-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageTestPageRoutingModule
  ],
  declarations: [PageTestPage]
})
export class PageTestPageModule {}
