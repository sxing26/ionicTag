import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { AntPath, antPath } from 'leaflet-ant-path';
import 'leaflet-routing-machine';
import {ApiService} from "../services/api.service";
import { Map, tileLayer, marker, icon } from 'leaflet';

@Component({
  selector: 'app-page-carte2',
  templateUrl: './page-carte2.page.html',
  styleUrls: ['./page-carte2.page.scss'],
})
export class PageCarte2Page implements OnInit {

  cityMarkerIcon = icon({

    iconUrl: 'assets/icon/marker.png',

    // Taille affichée

    iconSize: [48, 48],

    // Base de l'icône affiché, 24 est 48/2 (pour éviter les décalage à l'affichage)

    iconAnchor: [24, 48],

    // Position de la bulle de texte au clique sur le marqueur

    popupAnchor: [0, -48]

  });

  tramMarkerIcon = icon({

    iconUrl: 'assets/icon/trame.png',

    // Taille affichée

    iconSize: [48, 48],

    // Base de l'icône affiché, 24 est 48/2 (pour éviter les décalage à l'affichage)

    iconAnchor: [24, 48],

    // Position de la bulle de texte au clique sur le marqueur

    popupAnchor: [0, -48]

  });

  map: Leaflet.Map;
  private  coordinates;
  private indice: number;
  constructor(private api: ApiService) { }

  async getLineStationsCoords(lineId: string): Promise<Array<[string,string]>> {
    const res = [];
    const lineInfoRequest = await this.api.getLineDetails(lineId);
    const stationIds = lineInfoRequest.features[0].properties.ZONES_ARRET;
    for (const stationId of stationIds) {
      const stationInfoRequest = await this.api.getStationDetails(stationId);
      res.push([stationInfoRequest.features[0].geometry.coordinates[1], stationInfoRequest.features[0].geometry.coordinates[0]]);
    }
    return res;
  }

  async ngOnInit() {
    this.coordinates = await this.getLineStationsCoords("SEM_B");
    console.log(this.coordinates.length);
    console.log(this.coordinates[1]);
    console.log(this.coordinates[1][0]);
    console.log(this.coordinates[1][1]);
    console.log(this.getLineStationsCoords("SEM_B"));
    this.leafletMap();
  }

  ionViewDidEnter() {  }

  leafletMap() {

    this.map = Leaflet.map('mapId').setView([45.190984, 5.708719], 15);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap contributors, CC-BY-SA'
    }).addTo(this.map);

    const indice1 = this.coordinates[1][0];
    const indice2 = this.coordinates[1][1];

    Leaflet.marker([indice1, indice2], { icon: this.cityMarkerIcon }).addTo(this.map).bindPopup('Point de départ').openPopup();

    /*Leaflet.marker([45.190984, 5.708719], { icon: this.cityMarkerIcon }).addTo(this.map).bindPopup('Point de départ').openPopup();
    Leaflet.marker([45.190984, 5.707719], { icon: this.cityMarkerIcon }).addTo(this.map).bindPopup('Point darriver').openPopup();

    for(let i = 0; i<10; i++)
    {
      Leaflet.marker([45.190984 + (i/1000), 5.707719 + (i/1000)], { icon: this.cityMarkerIcon }).addTo(this.map).bindPopup('Indice' + i).openPopup();
    }*/

    for(this.indice = 0; this.indice < this.coordinates.length; this.indice++)
    {
      Leaflet.marker([this.coordinates[this.indice][0], this.coordinates[this.indice][1]], { icon: this.tramMarkerIcon }).addTo(this.map).bindPopup('Station ' + this.indice).openPopup();
      console.log("route : " + this.indice);
    }

    antPath([[45.18911, 5.7193 ], [45.19246, 5.7709]],
      { color: '#FF0000', weight: 5, opacity: 0.9 })
      .addTo(this.map);

    Leaflet.Routing.control({
      waypoints: [
        Leaflet.latLng(45.180984, 5.708719),
        Leaflet.latLng(45.185984, 5.708719),
        Leaflet.latLng(45.190984, 5.707719)
      ],
      lineOptions: {
        styles: [{color: 'blue', opacity: 1, weight: 5}]
      }

    }).addTo(this.map);

    Leaflet.Routing.control({
      waypoints: [
        Leaflet.latLng(45.180984, 5.708719),
        Leaflet.latLng(45.180984, 5.707919)
      ],
      lineOptions: {
        styles: [{color: '#FF00FF', opacity: 1, weight: 5}]
      }

    }).addTo(this.map);

  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }
}
