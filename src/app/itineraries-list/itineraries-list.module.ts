import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItinerariesListPageRoutingModule } from './itineraries-list-routing.module';

import { ItinerariesListPage } from './itineraries-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItinerariesListPageRoutingModule
  ],
  declarations: [ItinerariesListPage]
})
export class ItinerariesListPageModule {}
