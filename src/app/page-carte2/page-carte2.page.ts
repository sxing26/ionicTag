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
  private lines_trams;
  private station_name;
  private station_lines_color;
  private list_station;
  private indice: number;
  private indice2: number;
  constructor(private api: ApiService) { }

  async ngOnInit() {
    this.list_station = await this.getAllLinesIdColor();
    console.log(this.list_station);
    console.log(this.list_station[0].id);

    this.coordinates = await this.getLineStationsCoords(this.list_station[0].id);
    console.log(this.coordinates.length);
    console.log(this.coordinates[1]);
    console.log(this.coordinates[1][0]);
    console.log(this.coordinates[1][1]);
    console.log(this.getLineStationsCoords(this.list_station[0].id));

    this.lines_trams = await this.getLineTraceCoords(this.list_station[0].id);
    console.log(this.lines_trams.length);
    console.log(this.lines_trams);
    console.log(this.lines_trams[300]);

    this.station_name = await this.getLineStationsNames(this.list_station[0].id);
    console.log(this.station_name);

    this.leafletMap();
  }

  async getLineTraceCoords(lineId: string): Promise<Array<[string,string]>> {
    const res = [];
    const lineInfoRequest = await this.api.getLineDetails(lineId);
    const lineTraceCoords = lineInfoRequest.features[0].geometry.coordinates;
    for (const intermediate of lineTraceCoords) {
      for (const coord of intermediate) {
        res.push([coord[1], coord[0]]);
      }
    }
    return res;
  }

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

  async getLineStationsNames(lineId: string): Promise<Array<[string,string]>> {
    const res = [];
    const lineInfoRequest = await this.api.getLineDetails(lineId);
    const stationIds = lineInfoRequest.features[0].properties.ZONES_ARRET;
    for (const stationId of stationIds) {
      const stationInfoRequest = await this.api.getStationDetails(stationId);
      res.push(stationInfoRequest.features[0].properties.LIBELLE);
    }
    return res;
  }

  async getColorStation(lineId: string): Promise<string> {
    const lineInfoRequest = await this.api.getLineBySEM(lineId);
    return lineInfoRequest[0].color;
  }

  async getAllLinesIdColor(): Promise<any> {
    const lineInfoRequest = await this.api.getAllLinesList();
    const res = [];
    const i: number = 0;
    for (const line of lineInfoRequest)
    {
      if(line.id.includes("SEM"))
      {
        res.push({id: line.id.replace(":","_"), color: line.color});
      }
    }

    return res;
  }

  ionViewDidEnter() {  }

  leafletMap() {

    this.map = Leaflet.map('mapId').setView([45.190984, 5.708719], 15);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap contributors, CC-BY-SA'
    }).addTo(this.map);

    for(this.indice = 0; this.indice < this.coordinates.length; this.indice++)
    {
      Leaflet.marker([this.coordinates[this.indice][0], this.coordinates[this.indice][1]], { icon: this.tramMarkerIcon }).addTo(this.map).bindPopup(this.station_name[this.indice]).openPopup();
    }

    for(this.indice2 = 1; this.indice2 < this.lines_trams.length; this.indice2++)
    {
      Leaflet.polyline([[this.lines_trams[this.indice2-1][0], this.lines_trams[this.indice2-1][1]], [this.lines_trams[this.indice2][0], this.lines_trams[this.indice2][1]]],
        { color: "#" + this.list_station[0].color, weight: 5, opacity: 0.9 }).addTo(this.map);
    }

  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }
}
