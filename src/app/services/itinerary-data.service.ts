import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ItineraryDataService {

  private data: any;
  private cacheTTL: number;


  constructor(private storage: Storage) {
    this.cacheTTL = 60*180;
  }

  getData(): any {
    return this.data;
  };

  setData(d: any) {
    this.data = d;
  }

  public async save() {
    const validUntil = (new Date().getTime()) + this.cacheTTL * 1000;
    const data = this.getData();
    await this.storage.set('itinerary', {validUntil, data});
  }
}
