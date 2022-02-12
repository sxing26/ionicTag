import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripsearchPageRoutingModule } from './tripsearch-routing.module';

import { TripsearchPage } from './tripsearch.page';

import { StationSearchPipe } from '../pipes/station-search.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripsearchPageRoutingModule
  ],
  declarations: [TripsearchPage, StationSearchPipe],
  exports: [StationSearchPipe]
})
export class TripsearchPageModule {}
