import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://data.mobilites-m.fr/api/';

  constructor(private http: HttpClient) {}

  public getAllStationsList(): Promise<any>{
    return new Promise(
      (resolve, reject) => {
        this.http.get(this.baseUrl + 'findType/json?types=arret').subscribe(
          (data: any) => {
            console.log(data);
            if (data !== {}) { resolve(data); } else { reject('l\'appel n\'a pas pu être atteint'); }
          }
        );
      }
    );
  }

  public getAllLinesList(): Promise<any>{
    return new Promise(
      (resolve, reject) => {
        this.http.get(this.baseUrl + 'routers/default/index/routes').subscribe(
          (data: any) => {
            if(data !== {}){ resolve(data); } else { reject('l\'appel n\'a pas pu être atteint'); }
          }
        );
      }
    );
  }

  public getLineBySEM(sem: string): Promise<any>{
    return new Promise(
      (resolve, reject) => {
        this.http.get(this.baseUrl + 'routers/default/index/routes?codes=' + sem).subscribe(
          (data: any) => {
            if(data !== {}){ resolve(data); } else { reject('l\'appel n\'a pas pu être atteint ou SEM incorrect'); }
          }
        );
      }
    );
  }
}
