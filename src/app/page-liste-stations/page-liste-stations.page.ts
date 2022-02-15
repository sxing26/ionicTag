import { Component, OnInit } from '@angular/core';
import { LigneStationService } from "../services/ligne-station.service";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-page-liste-stations',
  templateUrl: './page-liste-stations.page.html',
  styleUrls: ['./page-liste-stations.page.scss'],
})
export class PageListeStationsPage implements OnInit {

  private station_name;

  constructor(private setService: LigneStationService, private api: ApiService) { }

  async ngOnInit() {
    this.station_name = await this.getLineStationsNames("SEM_"+this.setService.setLigneName());

    console.log(this.station_name);
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


}
