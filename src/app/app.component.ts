import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Search trip', url: '/tripsearch', icon: 'search' },
    { title: 'Carte du trajet', url: '/page-carte3', icon: 'map' },
    { title: 'Carte Grenoble TAG', url: '/page-carte2', icon: 'map' },
    { title: 'Liste des lignes et Station', url: '/page-liste-lignes', icon: 'list' },

  ];
  constructor() {}
}
