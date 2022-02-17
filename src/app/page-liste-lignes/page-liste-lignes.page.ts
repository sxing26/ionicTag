import { Component, OnInit } from '@angular/core';
import {ApiService} from "../services/api.service";
import {InterfaceMap} from "../interface-map";
import {InterfaceListeLigne} from "../interface-liste-ligne";
import { ModalController} from "@ionic/angular";
import { PageListeStationsPage} from "../page-liste-stations/page-liste-stations.page";
import { LigneStationService } from "../services/ligne-station.service";
import { MapListeLigneService } from "../services/map-liste-ligne.service";
import { Storage} from "@ionic/storage";

@Component({
  selector: 'app-page-liste-lignes',
  templateUrl: './page-liste-lignes.page.html',
  styleUrls: ['./page-liste-lignes.page.scss'],
})
export class PageListeLignesPage implements OnInit {

  private line_liste: InterfaceListeLigne[] = [];
  private list_station;
  private line_type_dictionnary: string[] = ["TRAM","NAVETTE","CHRONO","PROXIMO","FLEXO"];

  constructor(private api: ApiService, private modalCtrl: ModalController, private setService: LigneStationService, private setService2: MapListeLigneService, private storage: Storage) {
    this.storage.create();
  }

  async ngOnInit() {
    this.list_station = await this.getAllLinesInfo();

    for(let k = 0; k < this.list_station.length; k++)
    {
      this.line_liste.push({
        show: false,
        line: this.list_station[k].id,
        color: "#"+this.list_station[k].color,
        mode: this.list_station[k].mode,
        type: this.list_station[k].type
      });
    }

    console.log("-------------------------------");
    console.log(this.line_liste);

    this.storage.get('liste des lignes').then((val) => {
      if(val !== null)
      {
        this.line_liste = val;
      }
      else
      {
        this.line_liste = this.line_liste;
      }
    });
  }

  async getAllLinesInfo(): Promise<any> {
    const lineInfoRequest = await this.api.getAllLinesList();
    const res = [];
    const i: number = 0;
    for (const line of lineInfoRequest)
    {
      if(line.id.includes("SEM"))
      {
        res.push({id: line.id.replace("SEM:",""), color: line.color, mode: line.mode, type: line.type});
      }
    }

    return res;

  }

  async initModal(line: string){
    console.log("you slected the line " + line);
    const modal = await this.modalCtrl.create({
      component: PageListeStationsPage,
    });
    this.setService.getLigneName(line);

    return await  modal.present();
  }

  tooglechanged(line: string)
  {
    console.log("you click on " + line);

    for(let i = 0; i < this.line_liste.length; i++)
    {
      if (line === this.line_liste[i].line)
      {
        this.line_liste[i].show = !this.line_liste[i].show;
      }
    }
    this.storage.set("liste des lignes", this.line_liste);
    console.log(this.line_liste);
    this.setService2.setListeLigne(this.line_liste);
  }

}
