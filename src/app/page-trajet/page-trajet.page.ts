import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { AntPath, antPath } from 'leaflet-ant-path';
import 'leaflet-routing-machine';
import {ApiService} from "../services/api.service";
import { Map, tileLayer, marker, icon } from 'leaflet';
import { InterfaceMap } from "../interfaces/interface-map";
import { MapListeLigneService } from "../services/map-liste-ligne.service";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-page-trajet',
  templateUrl: './page-trajet.page.html',
  styleUrls: ['./page-trajet.page.scss'],
})
export class PageTrajetPage implements OnInit {

  map: Leaflet.Map;

  constructor() { }

  async ngOnInit() {
    await this.generateMap();
  }

  async generateMap() {

    this.map = Leaflet.map('mapId2').setView([45.190984, 5.708719], 15);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap contributors, CC-BY-SA'
    }).addTo(this.map);

  }

  onMapReady(map: Leaflet.Map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }

  ngOnDestroy() {
    this.map.remove();
  }

}
