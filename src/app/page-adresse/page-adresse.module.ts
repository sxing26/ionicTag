import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageAdressePageRoutingModule } from './page-adresse-routing.module';

import { PageAdressePage } from './page-adresse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageAdressePageRoutingModule
  ],
  declarations: [PageAdressePage]
})
export class PageAdressePageModule {}
