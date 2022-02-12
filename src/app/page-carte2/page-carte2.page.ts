import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { AntPath, antPath } from 'leaflet-ant-path';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-page-carte2',
  templateUrl: './page-carte2.page.html',
  styleUrls: ['./page-carte2.page.scss'],
})
export class PageCarte2Page implements OnInit {

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

    for(let i = 0; i<10; i++)
    {
      Leaflet.marker([45.190984 + (i/1000), 5.707719 + (i/1000)]).addTo(this.map).bindPopup('Indice' + i).openPopup();
    }

    antPath([[45.190984, 5.708719], [45.190884, 5.708789], [45.190884, 5.708749], [45.190984, 5.707719]],
      { color: '#FF0000', weight: 5, opacity: 0.9 })
      .addTo(this.map);

    Leaflet.Routing.control({
      waypoints: [
        Leaflet.latLng(45.180984, 5.708719),
        Leaflet.latLng(45.190984, 5.707719)
      ],
      color:'#FF00FF'
    }).addTo(this.map);


  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }
}
