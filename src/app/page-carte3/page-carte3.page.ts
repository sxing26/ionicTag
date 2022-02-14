import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, icon } from 'leaflet';
import { AntPath, antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-page-carte3',
  templateUrl: './page-carte3.page.html',
  styleUrls: ['./page-carte3.page.scss'],
})
export class PageCarte3Page implements OnInit {

  map: Map;

  cityMarkers: any = [

    {

      latitude: 48.8588897,

      longitude: 2.320041,

      name: 'Paris'

    },

    {

      latitude: 50.6365654,

      longitude: 3.0635282,

      name: 'Lille'

    },

    {

      latitude: 43.2961743,

      longitude: 5.3699525,

      name: 'Marseille'

    },

    {

      latitude: 44.841225,

      longitude: -0.5800364,

      name: 'Bordeaux'

    }

  ];

  cityMarkerIcon = icon({

    iconUrl: 'assets/icon/marker.png',

    // Taille affichée

    iconSize: [48, 48],

    // Base de l'icône affiché, 24 est 48/2 (pour éviter les décalage à l'affichage)

    iconAnchor: [24, 48],

    // Position de la bulle de texte au clique sur le marqueur

    popupAnchor: [0, -48]

  });

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {

    return this.initMap();
  }

  initMap() {

    // Centrer la carte sur la France

    this.map = new Map('map').setView([46, 2], 5);

    // Ajout des mentions OpenStreetMap, obligatoire

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

    }).addTo(this.map);

    // Création des marqueurs

    this.cityMarkers.map(m => {

      marker([m.latitude, m.longitude], { icon: this.cityMarkerIcon })

        .bindPopup(`Cette ville est<br><strong>${m.name}</strong>`, { autoClose: false })

        .addTo(this.map);
    });

    antPath([[ 45.18911, 5.7193 ], [45.19246, 5.7709], [45.20216, 5.70431 ]],
      { color: '#FF0000', weight: 5, opacity: 0.9 })
      .addTo(this.map);

    return;

  }

}
