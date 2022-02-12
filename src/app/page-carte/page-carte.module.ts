import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageCartePageRoutingModule } from './page-carte-routing.module';

import { PageCartePage } from './page-carte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageCartePageRoutingModule
  ],
  declarations: [PageCartePage]
})
export class PageCartePageModule {}
