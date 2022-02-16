import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://data.mobilites-m.fr/api/';

  constructor(private http: HttpClient) {
  }

  public getAllStationsList(): Promise<any> {
    return new Promise(
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
    );
  }


  public getAllLinesList(): Promise<any> {
    return new Promise(
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
    );
  }

  public getLineDetails(lineId: string): Promise<any> {
    return new Promise(
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
    );
  }

  public getStationDetails(stationId: string): Promise<any> {
    return new Promise(
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
    );
  }

  public getCalculatedTrip(startCoords: string, endCoords: string) {
    return new Promise(
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
    );
  }

  public getLineBySEM(sem: string): Promise<any> {
    return new Promise(
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
    );
  }

  public getStationsNearCoords(coords: Array<number>, dist: number): Promise<any> {
    return new Promise(
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
    );
  }

  public getItinerary(
    startCoords: Array<number>, endCoords: Array<number>,
    date: string, time: string,
    wheelchair: boolean,
    walkReluctance: number,
    mode: Array<string>): Promise<any> {
    return new Promise(
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
    );
  }
}
