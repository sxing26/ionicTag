import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { GoogleApiService } from '../services/google-api.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-tripsearch',
  templateUrl: './tripsearch.page.html',
  styleUrls: ['./tripsearch.page.scss'],
})
export class TripsearchPage implements OnInit {

  private tripStart: Array<number>;
  private tripStartName: string;
  private tripEnd: Array<number>;
  private tripEndName: string;
  private isSearchingTripStart: boolean;
  private isSearchingTripEnd: boolean;
  private stationsData: any;
  private stations: Array<{coords: Array<number>; name: string}>;
  private stationsNameList: any;
  private search: string;

  constructor(private api: ApiService, private googleApi: GoogleApiService, private geolocation: Geolocation) {
    this.tripStart = [];
    this.tripEnd = [];
    this.isSearchingTripStart = false;
    this.stationsNameList = [];
    this.stations = [];
  }

  async ngOnInit() {
    this.stationsData = await this.api.getAllStationsList();
    for (const feature of this.stationsData.features){
      const coords = feature.geometry.coordinates;
      const name = feature.properties.COMMUNE + ' // ' + feature.properties.LIBELLE;
      this.stations.push({ coords , name });
    }
  }

  launchTripSearch(){
    console.log(this.tripStart);
    console.log(this.tripEnd);
    console.log(this.stationsData.features[0]);
  };

  openStartSearchModal(){
    this.isSearchingTripStart = true;
  }

  closeStartSearchModal(){
    this.isSearchingTripStart = false;
  }

  openEndSearchModal(){
    this.isSearchingTripEnd = true;
  }

  closeEndSearchModal(){
    this.isSearchingTripEnd = false;
  }

  async validateStartSearchModal(){
    if(this.search !== ''){
      const dataFromAddress = await this.googleApi.getCoordsFromAddress(this.search);
      if (dataFromAddress.results.length === 1){
        this.tripStart = [dataFromAddress.results[0].geometry.location.lng, dataFromAddress.results[0].geometry.location.lat];
        this.tripStartName = dataFromAddress.results[0].formatted_address;
        this.search = '';
      }
    }
    this.isSearchingTripStart = false;
  }

  async validateEndSearchModal(){
    if(this.search !== ''){
      const dataFromAddress = await this.googleApi.getCoordsFromAddress(this.search);
      if (dataFromAddress.results.length === 1){
        console.log(dataFromAddress);
        this.tripEnd = [dataFromAddress.results[0].geometry.location.lng, dataFromAddress.results[0].geometry.location.lat];
        this.tripEndName = dataFromAddress.results[0].formatted_address;
        console.log(this.tripEnd);
        this.search = '';
      }
    }
    this.isSearchingTripEnd = false;
  }

  pickStartStation(station: any){
    this.tripStart = station.coords;
    this.tripStartName = station.name;
    this.isSearchingTripStart = false;
  }

  pickEndStation(station: any){
    this.tripEnd = station.coords;
    this.tripEndName = station.name;
    this.isSearchingTripEnd = false;
  }

  getCurrentGeoloc(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.tripStart = [resp.coords.longitude, resp.coords.latitude];
      this.tripStartName = resp.coords.longitude + ',' + resp.coords.latitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
