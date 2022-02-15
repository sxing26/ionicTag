import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageListeStationsPageRoutingModule } from './page-liste-stations-routing.module';

import { PageListeStationsPage } from './page-liste-stations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageListeStationsPageRoutingModule
  ],
  declarations: [PageListeStationsPage]
})
export class PageListeStationsPageModule {}
