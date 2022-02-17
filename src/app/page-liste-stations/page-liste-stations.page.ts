import { Component, OnInit } from '@angular/core';
import { LigneStationService } from '../services/ligne-station.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-page-liste-stations',
  templateUrl: './page-liste-stations.page.html',
  styleUrls: ['./page-liste-stations.page.scss'],
})
export class PageListeStationsPage implements OnInit {

  private selectedStation;
  private lineInformations;
  private currentDirection;

  constructor(private setService: LigneStationService, private api: ApiService) {
  }

  async ngOnInit() {
    this.currentDirection = 1;
    this.lineInformations = await this.getTimeTable(this.setService.getLigneName());
    console.log(this.lineInformations[0].times);
  }

  selectStation(item: string): void {
    if (this.selectedStation === item) {
      this.selectedStation = null;
    } else {
      this.selectedStation = item;
    }
  }

  showTimeTable(item: string): boolean {
    if (this.selectedStation === item) {
      return true;
    }
    return false;
  }

  async getTimeTable(item: string): Promise<any> {
    const res = [];
    const resDir1 = [];
    const resDir2 = [];
    const requestLine = await this.api.getLineTimeTable('SEM:' + item);

    for (const arret of requestLine[0].arrets) {
      const passageTimes: Array<string> = [];
      const requestStop = await this.api.getStopTimeTable(arret.stopId);
      console.log(requestStop);
      for (const line of requestStop){
        if (line.pattern.id.match('SEM:'+item)) {
          for (const time of line.times) {
            passageTimes.push(this.calculateTimeDiff(time.realtimeArrival));
          }
        }
      }
      resDir1.push({stationName: arret.stopName, nextTimes: passageTimes});
    }
    for (const arret of requestLine[1].arrets) {
      const passageTimes: Array<string> = [];
      const requestStop = await this.api.getStopTimeTable(arret.stopId);
      console.log(requestStop);
      for (const line of requestStop){
        if (line.pattern.id.match('SEM:'+item)) {
          for (const time of line.times) {
            passageTimes.push(this.calculateTimeDiff(time.realtimeArrival));
          }
        }
      }
      resDir2.push({stationName: arret.stopName, nextTimes: passageTimes});
    }

    res.push({direction: 1, destination: requestLine[1].arrets[0].stopName , stations: resDir1});
    res.push({direction: 2, destination: requestLine[0].arrets[0].stopName , stations: resDir2});
    return res;
  }

  calculateTimeDiff(dayTime: number): string {
    const currentTime: number = (new Date().getUTCHours() * 3600) + (new Date().getUTCMinutes() * 60) + (new Date().getUTCSeconds());
    return Math.round((dayTime - currentTime - 3600) / 60) + ' min';
  }

  toggleDirection() {
    if (this.currentDirection === 1){
      this.currentDirection = 2;
    } else if (this.currentDirection === 2){
      this.currentDirection = 1;
    }
  }
}
