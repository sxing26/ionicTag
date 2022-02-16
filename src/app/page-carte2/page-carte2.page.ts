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

    popupAnchor: [-15, -21]

  });

  busMarkerIcon = icon({

    iconUrl: 'assets/icon/bus.png',

    // Taille affichée

    iconSize: [24, 24],

    // Base de l'icône affiché, 24 est 48/2 (pour éviter les décalage à l'affichage)

    iconAnchor: [24, 24],

    // Position de la bulle de texte au clique sur le marqueur

    popupAnchor: [-15, -21]

  });

  map: Leaflet.Map;
  private line_liste: InterfaceMap[] = [];
  private  coordinates;
  private lines_trams;
  private station_name;
  private list_station;
  private trajet;
  private indice: number;
  private indice2: number;
  private indice3: number;
  constructor(private api: ApiService) {
  }

  async ngOnInit() {
    this.list_station = await this.getAllLinesInfo();

    for(let k = 0; k < this.list_station.length; k++)
    {
      if(this.list_station[k].id !== "SEM_81" && this.list_station[k].id !== "SEM_82")
      {
        console.log(this.list_station[k].id);
        this.line_liste.push({
          show: true,
          line: this.list_station[k].id,
          color: "#"+this.list_station[k].color,
          mode: this.list_station[k].mode
        });
        console.log(this.line_liste);
      }
    }

    console.log(this.line_liste);

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

  async getAllLinesInfo(): Promise<any> {
    const lineInfoRequest = await this.api.getAllLinesList();
    const res = [];
    const i: number = 0;
    for (const line of lineInfoRequest)
    {
      if(line.id.includes("SEM"))
      {
        res.push({id: line.id.replace(":","_"), color: line.color, mode: line.mode});
      }
    }

    return res;
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
      const dataStartCloseStation = await this.api.getStationsNearCoords(item.coords);
      for (const station of dataStartCloseStation) {
        if (station.lines.includes(lineId.replace('_', ':'))) {
          startIndex = item.index;
          break;
        }
      }
    }
    for (const item of endTestArea) {
      const dataEndCloseStation = await this.api.getStationsNearCoords(item.coords);
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

  ionViewDidEnter() {  }

  async generateMap() {

    this.map = Leaflet.map('mapId').setView([45.190984, 5.708719], 15);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap contributors, CC-BY-SA'
    }).addTo(this.map);

    this.trajet = await this.getPartialLineCoords(    [5.69047,45.16641],[5.72813,45.18233],"SEM_C");

    for(let i = 0; i < this.line_liste.length; i++)
    {
      if(this.line_liste[i].show === true)
      {
        this.coordinates = await this.getLineStationsCoords(this.line_liste[i].line);
        this.lines_trams = await this.getLineTraceCoords(this.line_liste[i].line);
        this.station_name = await this.getLineStationsNames(this.line_liste[i].line);

        for(this.indice = 0; this.indice < this.coordinates.length; this.indice++)
        {
          if(this.line_liste[i].mode === "TRAM") {
            Leaflet.marker([this.coordinates[this.indice][0], this.coordinates[this.indice][1]], { icon: this.tramMarkerIcon }).bindPopup(`<strong>${this.station_name[this.indice]}</strong>`, { autoClose: false }).addTo(this.map);
          }
          else {
            Leaflet.marker([this.coordinates[this.indice][0], this.coordinates[this.indice][1]], { icon: this.busMarkerIcon }).bindPopup(`<strong>${this.station_name[this.indice]}</strong>`, { autoClose: false }).addTo(this.map);
          }
        }

        for(this.indice2 = 1; this.indice2 < this.lines_trams.length; this.indice2++)
        {
          Leaflet.polyline([[this.lines_trams[this.indice2-1][0], this.lines_trams[this.indice2-1][1]], [this.lines_trams[this.indice2][0], this.lines_trams[this.indice2][1]]],
            { color: this.line_liste[i].color, weight: 5, opacity: 0.9 }).addTo(this.map);
        }

        //Trajet entre deux points point de coordonée
        for(this.indice3 = 1; this.indice3 < this.trajet.length; this.indice3++)
        {
          Leaflet.polyline([[this.trajet[this.indice3-1][1], this.trajet[this.indice3-1][0]], [this.trajet[this.indice3][1], this.trajet[this.indice3][0]]],
            { color: "#FF0000", weight: 5, opacity: 0.9 }).addTo(this.map);
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
