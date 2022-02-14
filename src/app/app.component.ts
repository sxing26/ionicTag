import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Search trip', url: '/tripsearch', icon: 'search' },
    { title: 'Carte', url: '/page-carte2', icon: 'heart' },
  ];
  constructor() {}
}
