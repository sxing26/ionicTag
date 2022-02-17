import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItineraryDataService {

  private data: any;

  constructor() { }

  getData(): any {
    return this.data;
  };

  setData(d: any) {
    this.data = d;
  }
}
