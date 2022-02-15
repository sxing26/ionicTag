import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-tripsearch',
  templateUrl: './tripsearch.page.html',
  styleUrls: ['./tripsearch.page.scss'],
})
export class TripsearchPage implements OnInit {

  private tripStart: string;
  private tripEnd: string;
  private isSearchingTripStart: boolean;
  private isSearchingTripEnd: boolean;
  private stations: any;
  private stationsNameList: any;
  private search: string;

  constructor(private api: ApiService) {
    this.tripStart = '';
    this.tripEnd = '';
    this.isSearchingTripStart = false;
    this.stationsNameList = [];
  }

  async ngOnInit() {
    this.stations = await this.api.getAllStationsList();
    for (const feature of this.stations.features){
      this.stationsNameList.push(feature.properties.COMMUNE + ' // ' + feature.properties.LIBELLE);
    }
    console.log(this.api.getPartialLineCoords([5.69047,45.16641],[5.72813,45.18233],'SEM_C'));
  }

  launchTripSearch(){
    console.log(this.tripStart);
    console.log(this.tripEnd);
    console.log(this.stations.features[0]);
  };

  toggleStartSearchModal(){
    this.isSearchingTripStart = !this.isSearchingTripStart;
  }

  toggleEndSearchModal(){
    this.isSearchingTripEnd = !this.isSearchingTripEnd;
  }

  pickStartStation(name: string){
    this.tripStart = name;
    this.isSearchingTripStart = false;
  }
}
