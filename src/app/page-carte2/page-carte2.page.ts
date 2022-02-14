import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { AntPath, antPath } from 'leaflet-ant-path';
import 'leaflet-routing-machine';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-page-carte2',
  templateUrl: './page-carte2.page.html',
  styleUrls: ['./page-carte2.page.scss'],
})
export class PageCarte2Page implements OnInit {

  map: Leaflet.Map;
  private test;

  constructor(private api: ApiService) { }

  async ngOnInit() {
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

  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {

    var greenIcon = Leaflet.icon({
      iconUrl: 'leaf-green.png',
      shadowUrl: 'leaf-shadow.png',

      iconSize:     [38, 95], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    this.map = Leaflet.map('mapId').setView([45.190984, 5.708719], 15);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap contributors, CC-BY-SA'
    }).addTo(this.map);

    Leaflet.marker([45.190984, 5.708719]).addTo(this.map).bindPopup('Point de départ').openPopup();
    Leaflet.marker([45.190984, 5.707719]).addTo(this.map).bindPopup('Point darriver').openPopup();

    for(let i = 0; i<10; i++)
    {
      Leaflet.marker([45.190984 + (i/1000), 5.707719 + (i/1000)]).addTo(this.map).bindPopup('Indice' + i).openPopup();
    }

    antPath([[45.190984, 5.708719], [45.190884, 5.708789], [45.190984, 5.709919]],
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
