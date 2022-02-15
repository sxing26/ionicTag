import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageListeLignesPageRoutingModule } from './page-liste-lignes-routing.module';

import { PageListeLignesPage } from './page-liste-lignes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageListeLignesPageRoutingModule
  ],
  declarations: [PageListeLignesPage]
})
export class PageListeLignesPageModule {}
