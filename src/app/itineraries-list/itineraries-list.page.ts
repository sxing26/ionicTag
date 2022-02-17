import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {DataTransferService} from '../services/data-transfer.service';
import {ItineraryDataService} from '../services/itinerary-data.service';
import polyUtil from 'polyline-encoded';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';


@Component({
  selector: 'app-itineraries-list',
  templateUrl: './itineraries-list.page.html',
  styleUrls: ['./itineraries-list.page.scss'],
})



export class ItinerariesListPage implements OnInit {

  private itineraryArray: Array<any>;
  private detailsModalOpen: boolean;
  private currentShownItineraryLegs: Array<any>;
  private leg: any = {};

  constructor(private api: ApiService, private data: DataTransferService, private itineraryData: ItineraryDataService, private router: Router, private modalCtrl: ModalController) {
    this.detailsModalOpen = false;
  }

  async ngOnInit() {
    this.itineraryArray = await this.getItinerariesList();
  }

  async getItinerariesList(): Promise<Array<any>> {
    const d = this.data;
    const itineraryData: any = await this.api.getItinerary(
      d.getStartCoords(),
      d.getEndCoords(),
      d.getDate(),
      d.getTime(),
      d.getWheelchair(),
      d.getWalkReluctance(),
      d.getMode());
    return itineraryData.plan.itineraries;
  }

  formatTime(unixDate: number): string {
    const fullDate = new Date(unixDate);
    return fullDate.toString().slice(16,21);
  }

  formatDistance(distance: number): string {
    if (distance > 1000){
      return Math.round(distance/100)/10 + ' km';
    }
    return Math.round(distance) + ' m';
  }

  secondsToMinutes(seconds: number): string {
    if(seconds > 60) {
      return Math.round(seconds/60) + ' min';
    }
    return seconds + ' sec';
  }

  showDetails(itinerary: any){
    this.currentShownItineraryLegs = itinerary.legs;
    this.detailsModalOpen = true;
    console.log(this.currentShownItineraryLegs);
  }

/*  showLegSteps(leg: any) {

  }*/

  closeDetailsModal() {
    this.detailsModalOpen = false;
  }

  sentenceFromStep(step: any): string {
    return step.relativeDirection + ' vers ' + step.streetName + ' sur ' + Math.round(step.distance) + ' m';
  }

  sentenceFromTransit(leg: any): Array<string> {
    return ['Prendre le' + leg.mode + ' ' + leg.route + ' à ' + leg.from.name + ' vers ' + leg.headsign ,
      'Descendre à ' + leg.to.name + ' (' + (leg.to.stopIndex - leg.from.stopIndex) + ' arrêts)' ];
  }

  fullSteps(leg: any): Array<string> {
    const res: Array<string> = [];
    for (const step of leg.steps) {
      res.push(this.sentenceFromStep(step));
    }
    return res;
  }



  selectItinerary(): void {
    const iData: any = [];

    for (const leg of this.currentShownItineraryLegs) {
      const polylineTrace = polyUtil.decode(leg.legGeometry.points);
      if (leg.agencyId !== undefined) {
        iData.push({ type: 'transport' , color: '#' + leg.routeColor , trace: polylineTrace, description: this.sentenceFromTransit(leg), line : null });
      } else {
        iData.push({ type: 'walk', color: '#888888', trace: polylineTrace, description: this.fullSteps(leg), line: leg.route });
      }
    }
    this.itineraryData.setData(iData);
    this.router.navigate(['/page-carte3']);
    this.modalCtrl.dismiss();
  }
}
