import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { AntPath, antPath } from 'leaflet-ant-path';
import 'leaflet-routing-machine';
import {ApiService} from "../services/api.service";
import { Map, tileLayer, marker, icon } from 'leaflet';
import { InterfaceMap } from "../interface-map";
import { MapListeLigneService } from "../services/map-liste-ligne.service";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Storage} from "@ionic/storage";
import {ItineraryDataService} from "../services/itinerary-data.service";

@Component({
  selector: 'app-page-carte3',
  templateUrl: './page-carte3.page.html',
  styleUrls: ['./page-carte3.page.scss'],
})
export class PageCarte3Page implements OnInit {

  map: Map;
  private trajet;
  private indice3;

  cityMarkerIcon = icon({

    iconUrl: 'assets/icon/marker.png',

    // Taille affichée

    iconSize: [48, 48],

    // Base de l'icône affiché, 24 est 48/2 (pour éviter les décalage à l'affichage)

    iconAnchor: [24, 48],

    // Position de la bulle de texte au clique sur le marqueur

    popupAnchor: [0, -48]


  });

  constructor(private api: ApiService, private itineraryData: ItineraryDataService) { }

  ngOnInit() {
    console.log(this.itineraryData.getData());
  }

  ionViewDidEnter() {

    return this.initMap();
  }

  async getPartialLineCoords(startStopCoords: Array<number>, endStopCoords: Array<number>, lineId: string): Promise<any> {
    const startTestArea = [];
    const endTestArea = [];
    let startIndex: string;
    let endIndex: string;
    const truncateByDecimalPlace = (value, numDecimalPlaces) =>
      Math.trunc(value * Math.pow(10, numDecimalPlaces)) / Math.pow(10, numDecimalPlaces);

    const dataLine = await this.api.getLineDetails(lineId);
    const lineCoords = dataLine.features[0].geometry.coordinates;
    for (const [index, coord] of Object.entries(lineCoords[0])) {
      if (truncateByDecimalPlace(coord[0], 3) === truncateByDecimalPlace(startStopCoords[0], 3)
        && truncateByDecimalPlace(coord[1], 3) === truncateByDecimalPlace(startStopCoords[1], 3)) {
        startTestArea.push({index, coords: coord});
      } else if (truncateByDecimalPlace(coord[0], 3) === truncateByDecimalPlace(endStopCoords[0], 3)
        && truncateByDecimalPlace(coord[1], 3) === truncateByDecimalPlace(endStopCoords[1], 3)) {
        endTestArea.push({index, coords: coord});
        // grossir la recherche si rien trouvé? -> après la boucle?
      }
    }
    for (const item of startTestArea) {
      const dataStartCloseStation = await this.api.getStationsNearCoords(item.coords, 5);
      for (const station of dataStartCloseStation) {
        if (station.lines.includes(lineId.replace('_', ':'))) {
          startIndex = item.index;
          break;
        }
      }
    }
    for (const item of endTestArea) {
      const dataEndCloseStation = await this.api.getStationsNearCoords(item.coords, 5);
      for (const station of dataEndCloseStation) {
        if (station.lines.includes(lineId.replace('_', ':'))) {
          endIndex = item.index;
          break;
        }
      }
    }
    const merged = [].concat.apply([], lineCoords);
    return merged.slice(startIndex, endIndex);
  }

  async getIténairLineCoords()
  {
    console.log("----------------------------");
    console.log(this.itineraryData.getData());
    console.log("----------------------------");
  }

  async initMap() {

    this.map = Leaflet.map('mapId2').setView([45.190984, 5.708719], 15);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap contributors, CC-BY-SA'
    }).addTo(this.map);

    this.trajet = await this.getPartialLineCoords(    [5.69047,45.16641],[5.72813,45.18233],"SEM_C");

    //Trajet entre deux points point de coordonée
    for(this.indice3 = 1; this.indice3 < this.trajet.length; this.indice3++)
    {
      Leaflet.polyline([[this.trajet[this.indice3-1][1], this.trajet[this.indice3-1][0]], [this.trajet[this.indice3][1], this.trajet[this.indice3][0]]],
        { color: "#FF0000", weight: 5, opacity: 0.9 }).addTo(this.map);
    }

    await this.getIténairLineCoords();

    return;

  }

}
