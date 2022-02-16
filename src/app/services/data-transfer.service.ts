import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private startCoords: Array<number>;
  private endCoords: Array<number>;
  private date: string;
  private time: string;
  private mode: Array<string>;
  private wheelchair: boolean;
  private walkReluctance: number;

  constructor() {
    this.mode = ['WALK'];
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
}
