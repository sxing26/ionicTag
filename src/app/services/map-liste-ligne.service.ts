import { Injectable } from '@angular/core';
import {InterfaceListeLigne} from "../interface-liste-ligne";

@Injectable({
  providedIn: 'root'
})
export class MapListeLigneService {

  private line_liste: InterfaceListeLigne[] = [];

  constructor() { }

  setListeLigne(line_liste2: InterfaceListeLigne[])
  {
    this.line_liste = line_liste2;
    console.log(this.line_liste);
  }

  getListeLigne()
  {
    return this.line_liste;
  }
}
