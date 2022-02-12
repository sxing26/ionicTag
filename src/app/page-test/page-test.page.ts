import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-page-test',
  templateUrl: './page-test.page.html',
  styleUrls: ['./page-test.page.scss'],
})
export class PageTestPage implements OnInit {

  map: Leaflet.Map;

  constructor() { }

  ngOnInit() {  }

  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {
    this.map = Leaflet.map('mapId').setView([45.190984, 5.708719], 15);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap contributors, CC-BY-SA'
    }).addTo(this.map);

    Leaflet.marker([45.190984, 5.708719]).addTo(this.map).bindPopup('Point de départ').openPopup();
    Leaflet.marker([45.190984, 5.707719]).addTo(this.map).bindPopup('Point darriver').openPopup();
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }
}
