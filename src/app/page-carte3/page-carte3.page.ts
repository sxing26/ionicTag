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
  private point_arriver;
  private point_depart;
  private itineraire = [];
  private list_description = [];
  private list_description_par_ligne = [];
  private d;

  cityMarkerIcon = icon({

    iconUrl: 'assets/icon/marker.png',

    // Taille affichée

    iconSize: [48, 48],

    // Base de l'icône affiché, 24 est 48/2 (pour éviter les décalage à l'affichage)

    iconAnchor: [24, 48],

    // Position de la bulle de texte au clique sur le marqueur

    popupAnchor: [0, -48]


  });

  constructor(private api: ApiService, private itineraryData: ItineraryDataService, private storage: Storage) { }

  async ngOnInit() {
    const currentTime = new Date().getTime();
    const cache = await this.storage.get('itinerary');
    console.log(cache.data);
    if ((cache && cache !== null && cache !== undefined) && cache.validUntil > currentTime) {
      this.d = cache.data;
    } else {
      await this.storage.remove('itinerary');
    }
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
    if(this.d !== undefined)
    {
      for(let i = 0; i < this.d.length; i++)
      {
        console.log(this.d[i].line);
        if(this.d[i].line === null) {
          this.itineraire.push({line: "WALK",color: this.d[i].color,trace: this.d[i].trace});
        }
        else{
          this.itineraire.push({line: "Ligne: " + this.d[i].line,color: this.d[i].color,trace: this.d[i].trace});
        }
      }
    }
  }

  async getPointDepart() {
    if(this.itineraryData.getData() !== undefined)
    {
      this.point_depart = this.itineraryData.getData()[0].trace[0];
    }
  }

  async getPointArriver() {
    if(this.itineraryData.getData() !== undefined)
    {
      this.point_arriver = this.itineraryData.getData()[this.itineraryData.getData().length-1].trace[this.itineraryData.getData()[this.itineraryData.getData().length-1].trace.length-1];
    }
  }

  async getListInstraction(){

    if(this.itineraryData.getData() !== undefined)
    {
      for(let i = 0; i <  this.itineraryData.getData().length; i++)
      {
        for( let y = 0; y < this.itineraryData.getData()[i].description.length; y++)
        {
          console.log(this.itineraryData.getData()[i].description[y]);
          this.list_description.push(this.itineraryData.getData()[i].description[y]);
        }
        console.log(this.list_description);
        console.log("------------------------------------");
        this.list_description_par_ligne.push(this.list_description);
        this.list_description = [];
      }

      console.log("----------------");
      console.log(this.list_description_par_ligne);
      console.log("----------------");
    }
  }

  async initMap() {

    await this.getIténairLineCoords();
    await this.getPointDepart();
    await this.getPointArriver();
    await this.getListInstraction();

    console.log("***************************");
    console.log(this.itineraire[0].color + " " + this.itineraire[1].color + " " + this.itineraire[2].color );
    console.log("***************************");

    this.map = Leaflet.map('mapId2').setView([45.190984, 5.708719], 15);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap contributors, CC-BY-SA'
    }).addTo(this.map);

    Leaflet.marker([this.point_depart[0],this.point_depart[1]], { icon: this.cityMarkerIcon })
      .bindPopup(`<strong>Point de départ</strong>`, { autoClose: false }).addTo(this.map);

    Leaflet.marker([this.point_arriver[0],this.point_arriver[1]], { icon: this.cityMarkerIcon })
      .bindPopup(`<strong>Point de départ</strong>`, { autoClose: false }).addTo(this.map);

    for(let i = 0; i < this.itineraire.length; i++)
    {
      for(let y = 1; y < this.itineraire[i].trace.length; y++)
      {
        Leaflet.polyline([[this.itineraire[i].trace[y-1][0],this.itineraire[i].trace[y-1][1]], [this.itineraire[i].trace[y][0],this.itineraire[i].trace[y][1]]],
          { color: this.itineraire[i].color, weight: 5, opacity: 0.9 }).bindPopup(this.itineraire[i].line).addTo(this.map);
      }
    }

    return;

  }

}
