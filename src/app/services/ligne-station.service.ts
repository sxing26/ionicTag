import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LigneStationService {

  private ligne_name: string;

  constructor() { }

  getLigneName(ligne_name: string)
  {
    this.ligne_name = ligne_name;
  }

  setLigneName()
  {
    return this.ligne_name;
  }


}
