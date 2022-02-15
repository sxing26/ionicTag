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

  /* public getPartialLineCoords(startStopId: string, endStopId: string, lineId: string): Promise<any>
   {
     let startStopZone: string;
     let endStopZone: string;
     let startStopCoords: Array<string>;
     let endStopCoords: Array<string>;
     return new Promise(
       (resolve, reject) => {
         this.http.get(this.baseUrl + 'findType/json?types=pointArret').subscribe(
           (dataStopZones: any) => {
             if (dataStopZones !== {}) {
               const stopZones = dataStopZones.features;
               for (const stopZone of stopZones){
                 if(stopZone.properties.CODE === startStopId){
                   startStopZone = stopZone.properties.ZONE;
                 }
                 if(stopZone.properties.CODE === endStopId){
                   endStopZone = stopZone.properties.ZONE;
                 }
               }
               if (startStopZone === ''){
                 reject('wrong startStopId!');
               } else if (endStopZone === '') {
                 reject('wrong endStopId!');
               }
               this.http.get(this.baseUrl + 'findType/json?types=arret').subscribe(
                 (dataStopPoint: any) => {
                   if (dataStopPoint !== {}) {
                     const stopPoints = dataStopPoint.features;
                     console.log('startStopZone: ' + startStopZone);
                     console.log('endStopZone: ' + endStopZone);
                     for (const stopPoint of stopPoints){
                       if(stopPoint.properties.CODE === startStopZone){
                         startStopCoords = stopPoint.geometry.coordinates;
                       }
                       if(stopPoint.properties.CODE === endStopZone){
                         endStopCoords = stopPoint.geometry.coordinates;
                       }
                     }
                     console.log(startStopCoords);
                     console.log(endStopCoords);
                     this.http.get(this.baseUrl + 'lines/json?types=ligne&codes=' + lineId).subscribe(
                       (dataLine: any) => {
                         if (dataLine !== {}) {
                           const lineCoords = dataLine.features[0].geometry.coordinates;
                           let startIndex: string;
                           let endIndex: string;
                           for (const [index,coord] of Object.entries(lineCoords[0])){
                             console.log(coord);
                             if (coord === startStopCoords){
                               console.log('test1!');
                               startIndex = index;
                             } else if (coord === endStopCoords) {
                               console.log('test2!');
                               endIndex = index;
                             }
                           }
                           console.log('startIndex');
                           console.log(startIndex);
                           console.log('endIndex');
                           console.log(endIndex);
                           const finalCoordsTrace = lineCoords.slice(startIndex, endIndex);
                           console.log(finalCoordsTrace);
                           resolve(finalCoordsTrace);
                         } else {
                           reject('l\'appel n\'a pas pu être atteint ou SEM incorrect');
                         }
                       }
                     );
                   } else {
                     reject('l\'appel n\'a pas pu être atteint');
                   }
                 }
               );
             } else {
               reject('l\'appel n\'a pas pu être atteint');
             }
           }
         );
       }
     );
   }*/



  public getStationsNearCoords(coords: Array<number>): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.http.get(this.baseUrl + 'linesNear/json?x=' + coords[0] + '&y=' + coords[1] + '&dist=5&details=true').subscribe(
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
}
