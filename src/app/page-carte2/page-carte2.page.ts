import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { AntPath, antPath } from 'leaflet-ant-path';
import 'leaflet-routing-machine';
import {ApiService} from "../services/api.service";
import { Map, tileLayer, marker, icon } from 'leaflet';
import { InterfaceMap } from "../interface-map";

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

    iconSize: [24, 24],

    // Base de l'icône affiché, 24 est 48/2 (pour éviter les décalage à l'affichage)

    iconAnchor: [24, 24],

    // Position de la bulle de texte au clique sur le marqueur

    popupAnchor: [0, -48]

  });

  map: Leaflet.Map;
  line_liste: InterfaceMap[] = [];
  private  coordinates;
  private lines_trams;
  private station_name;
  private list_station;
  private indice: number;
  private indice2: number;
  constructor(private api: ApiService) {
  }

  async ngOnInit() {
    this.list_station = await this.getAllLinesIdColor();

    for(let k = 0; k < 5; k++)
    {
      this.line_liste.push({
        show: true,
        line: this.list_station[k].id,
        color: "#"+this.list_station[k].color
      });
    }

    this.generateMap();
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

  async generateMap() {

    console.log(this.line_liste);

    this.map = Leaflet.map('mapId').setView([45.190984, 5.708719], 15);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap contributors, CC-BY-SA'
    }).addTo(this.map);

    for(let i = 0; i < 5; i++)
    {
      if(this.line_liste[i].show === true)
      {
        this.coordinates = await this.getLineStationsCoords(this.list_station[i].id);
        this.lines_trams = await this.getLineTraceCoords(this.list_station[i].id);
        this.station_name = await this.getLineStationsNames(this.list_station[i].id);

        for(this.indice = 0; this.indice < this.coordinates.length; this.indice++)
        {
          Leaflet.marker([this.coordinates[this.indice][0], this.coordinates[this.indice][1]], { icon: this.tramMarkerIcon }).addTo(this.map).bindPopup(this.station_name[this.indice]);
        }

        for(this.indice2 = 1; this.indice2 < this.lines_trams.length; this.indice2++)
        {
          Leaflet.polyline([[this.lines_trams[this.indice2-1][0], this.lines_trams[this.indice2-1][1]], [this.lines_trams[this.indice2][0], this.lines_trams[this.indice2][1]]],
            { color: "#" + this.list_station[i].color, weight: 5, opacity: 0.9 }).addTo(this.map);
        }
      }
    }

  }

  tooglechanged(line: string) {
    console.log("TOOGLE HAS CHANGED");
    console.log("you remove the line : " + line);

    for(let i = 0; i < this.line_liste.length; i++)
    {
      if (line === this.line_liste[i].line)
      {
        this.line_liste[i].show = !this.line_liste[i].show;
      }
    }
    this.map.remove();
    this.generateMap();

    console.log(this.line_liste);
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }
}
