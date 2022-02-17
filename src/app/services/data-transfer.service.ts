import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private startName: string;
  private endName: string;
  private startCoords: Array<number>;
  private endCoords: Array<number>;
  private dateTime: any;
  private date: string;
  private time: string;
  private mode: Array<string>;
  private wheelchair: boolean;
  private walkReluctance: number;
  private cacheTTL: number;

  constructor(private storage: Storage) {
    this.mode = ['WALK'];
    this.cacheTTL = 60*5;
  }

  public getStartName(): string {
    return this.startName;
  }

  public setStartName(sN: string) {
    this.startName = sN;
  }

  public getEndName(): string {
    return this.endName;
  }

  public setEndName(eN: string) {
    this.endName = eN;
  }

  public getStartCoords(): Array<number> {
   return this.startCoords;
  }

  public setStartCoords(coords: Array<number>) {
    this.startCoords = coords;
  }

  public getEndCoords(): Array<number> {
    return this.endCoords;
  }

  public setEndCoords(coords: Array<number>) {
    this.endCoords = coords;
  }

  public getDateTime(): any {
    return this.dateTime;
  }

  public setDateTime(dT: any) {
    this.dateTime = dT;
  }

  public getTime(): string {
    return this.time;
  }

  public setTime(time: string) {
    this.time = time;
  }

  public getDate(): string {
    return this.date;
  }

  public setDate(date: string) {
    this.date = date;
  }

  public getWheelchair(): boolean {
    return this.wheelchair;
  }

  public setWheelchair(accesible: boolean) {
    this.wheelchair = accesible;
  }

  public getWalkReluctance(): number {
    return this.walkReluctance;
  }

  public setWalkReluctance(wR: number) {
    this.walkReluctance = wR;
  }

  public getMode(): Array<string> {
    return this.mode;
  }

  public async save() {
    const validUntil = (new Date().getTime()) + this.cacheTTL * 1000;
    const data = {
      tSN : this.getStartName(),
      tEN : this.getEndName(),
      tS : this.getStartCoords(),
      tE : this.getEndCoords(),
      tDT : this.getDateTime(),
      tD : this.getDate(),
      tT : this.getTime(),
      wh : this.getWheelchair(),
      wR : this.getWalkReluctance(),
      m : this.getMode(),
    };
    await this.storage.set('searchInput', {validUntil, data});
  }

}
