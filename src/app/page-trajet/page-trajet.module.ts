import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageTrajetPageRoutingModule } from './page-trajet-routing.module';

import { PageTrajetPage } from './page-trajet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageTrajetPageRoutingModule
  ],
  declarations: [PageTrajetPage]
})
export class PageTrajetPageModule {}
