import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly cacheTTL = 60 * 5;
  private baseUrl = 'https://data.mobilites-m.fr/api/';

  constructor(private http: HttpClient, private storage: Storage) {
  }

  async getAllStationsList(): Promise<any> {
    const res = await this.getUrlData('findType/json?types=arret', true);
    return res;
    /*return new Promise(
      (resolve, reject) => {
        this.http.get(this.baseUrl + 'findType/json?types=arret').subscribe(
          (data: any) => {
            if (data !== {}) {
              resolve(data);
            } else {
              reject('l\'appel n\'a pas pu être atteint');
            }
          }
        );
      }
    );*/
  }

  async getAllLinesList(): Promise<any> {
    return await this.getUrlData('routers/default/index/routes', true);
    /*return new Promise(
      (resolve, reject) => {
        this.http.get(this.baseUrl + 'routers/default/index/routes').subscribe(
          (data: any) => {
            if (data !== {}) {
              resolve(data);
            } else {
              reject('l\'appel n\'a pas pu être atteint');
            }
          }
        );
      }
    );*/
  }

  async getLineDetails(lineId: string): Promise<any> {
    return await this.getUrlData('lines/json?types=ligne&codes=' + lineId, true);
    /*return new Promise(
      (resolve, reject) => {
        this.http.get(this.baseUrl + 'lines/json?types=ligne&codes=' + lineId).subscribe(
          (data: any) => {
            if (data !== {}) {
              resolve(data);
            } else {
              reject('l\'appel n\'a pas pu être atteint ou l\'Id entrée est erronée');
            }
          }
        );
      }
    );*/
  }

  async getStationDetails(stationId: string): Promise<any> {
    return await this.getUrlData('findType/json?types=arret&codes=' + stationId, true);
    /*return new Promise(
      (resolve, reject) => {
        this.http.get(this.baseUrl + 'findType/json?types=arret&codes=' + stationId).subscribe(
          (data: any) => {
            if (data !== {}) {
              resolve(data);
            } else {
              reject('l\'appel n\'a pas pu être atteint ou l\'id est incorrecte');
            }
          }
        );
      }
    );*/
  }

  async getCalculatedTrip(startCoords: string, endCoords: string) {
    return await this.getUrlData('routers/default/plan?fromPlace=' + startCoords + '&toPlace=' + endCoords, true);
    /*return new Promise(
      (resolve, reject) => {
        this.http.get(this.baseUrl + 'routers/default/plan?fromPlace=' + startCoords + '&toPlace=' + endCoords).subscribe(
          (data: any) => {
            if (data !== {}) {
              resolve(data);
            } else {
              reject('l\'appel n\'a pas pu être atteint ou les ' +
                'coordonnées entrées sont erronées ou hors champ');
            }
          }
        );
      }
    );*/
  }

  async getLineBySEM(sem: string): Promise<any> {
    return await this.getUrlData('routers/default/index/routes?codes=' + sem, true);
    /*return new Promise(
      (resolve, reject) => {
        this.http.get(this.baseUrl + 'routers/default/index/routes?codes=' + sem).subscribe(
          (data: any) => {
            if (data !== {}) {
              resolve(data);
            } else {
              reject('l\'appel n\'a pas pu être atteint ou SEM incorrect');
            }
          }
        );
      }
    );*/
  }

  async getStationsNearCoords(coords: Array<number>, dist: number): Promise<any> {
    return await this.getUrlData('linesNear/json?x=' + coords[0] + '&y=' + coords[1] + '&dist=' + dist + '&details=true', true);
    /*return new Promise(
      (resolve, reject) => {
        this.http.get(this.baseUrl + 'linesNear/json?x=' + coords[0] + '&y=' + coords[1] + '&dist=' + dist + '&details=true').subscribe(
          (data: any) => {
            if (data !== {}) {
              resolve(data);
            } else {
              reject('l\'appel n\'a pas pu être atteint ou les coordonnées sont incorrectes');
            }
          }
        );
      }
    );*/
  }

  async getItinerary(
    startCoords: Array<number>, endCoords: Array<number>,
    date: string, time: string,
    wheelchair: boolean,
    walkReluctance: number,
    mode: Array<string>): Promise<any> {
    return await this.getUrlData('routers/default/plan?fromPlace=' + startCoords[1] + '%2C' + startCoords[0] + '&toPlace=' + endCoords[1] + '%2C' + endCoords[0] + '&date=' + date + '&time=' + time + '&wheelchair=' + wheelchair + '&walkReluctance=' + walkReluctance + '&numItineraries=5&mode=' + mode.join(','), true);
    /*return new Promise(
      (resolve, reject) => {
        console.log(startCoords);
        this.http.get(this.baseUrl + 'routers/default/plan?fromPlace=' + startCoords[1] + '%2C' + startCoords[0] + '&toPlace=' + endCoords[1] + '%2C' + endCoords[0] + '&date=' + date + '&time=' + time + '&wheelchair=' + wheelchair + '&walkReluctance=' + walkReluctance + '&numItineraries=5&mode=' + mode.join(',')).subscribe(
          (data: any) => {
            if (data !== {}) {
              resolve(data);
            } else {
              reject('l\'appel n\'a pas pu être atteint ou les données sont incorrectes');
            }
          }
        );
      }
    );*/
  }

  async getLineTimeTable(lineId: string): Promise<any> {
    const currentTime = new Date().getTime();
    return await this.getUrlData('ficheHoraires/json?route=' + lineId + '&time=' + currentTime, true);
    /*return new Promise(
      (resolve, reject) => {
        const currentTime = new Date().getTime();
        this.http.get(this.baseUrl + 'ficheHoraires/json?route=' + lineId + '&time=' + currentTime).subscribe(
          (data: any) => {
            if (data !== {}) {
              resolve(data);
            } else {
              reject('l\'appel n\'a pas pu être atteint ou les coordonnées sont incorrectes');
            }
          }
        );
      }
    );*/
  }

  async getStopTimeTable(stopCode): Promise<any> {
    return await this.getUrlData('routers/default/index/stops/' + stopCode + '/stoptimes', true);
    /*return new Promise(
      (resolve, reject) => {
        const currentTime = new Date().getTime();
        this.http.get(this.baseUrl + 'routers/default/index/stops/' + stopCode + '/stoptimes').subscribe(
          (data: any) => {
            if (data !== {}) {
              resolve(data);
            } else {
              reject('l\'appel n\'a pas pu être atteint ou les coordonnées sont incorrectes');
            }
          }
        );
      }
    );*/
  }

  private getUrlData(path: string, useCache: boolean) {
    return new Promise(async (resolve): Promise<any> => {
      const url = this.baseUrl + path;
      if (useCache) {
        const currentTime = new Date().getTime();
        const cache = await this.storage.get(path);
        if ((cache || cache !== null) && cache.validUntil > currentTime) {
          resolve(cache.data);
          return;
        } else {
          await this.storage.remove(path);
        }
      }
      this.http.get(url).subscribe(async (data: any) => {
        const validUntil = (new Date().getTime()) + this.cacheTTL * 1000;
        await this.storage.set(path, {validUntil, data});
        resolve(data);
      });
    });
  }
}
