import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LigneStationService {

  private ligne_name: string;

  constructor() { }

  setLigneName(ligne_name: string)
  {
    this.ligne_name = ligne_name;
  }

  getLigneName()
  {
    return this.ligne_name;
  }
}
