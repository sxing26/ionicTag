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
  private searchTripStart: string;
  private searchTripEnd: string;

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
  }

  launchTripSearch(){
    // uniformiser les retours (sous forme de coordonnées?)
    console.log(this.tripStart);
    console.log(this.tripEnd);
  };

  toggleStartSearchModal(){
    this.isSearchingTripStart = !this.isSearchingTripStart;
  }

  validateStartSearchModal(){
    this.tripStart = this.searchTripStart;
    this.isSearchingTripStart = false;
  }

  toggleEndSearchModal(){
    this.isSearchingTripEnd = !this.isSearchingTripEnd;
  }

  validateEndSearchModal(){
    this.tripEnd = this.searchTripEnd;
    this.isSearchingTripEnd = false;
  }

  pickStartStation(name: string){
    this.tripStart = name;
    this.isSearchingTripStart = false;
  }

  pickEndStation(name: string){
    this.tripEnd = name;
    this.isSearchingTripEnd = false;
  }
}
