import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  private baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
  private apiKeyString = '&key=AIzaSyDPVuCks9moF9HA8fYSyz7bKerQFn7-pa0';

  constructor(private http: HttpClient) {}

  public getCoordsFromAddress(): Promise<Array<string>>{
    return new Promise(
      (resolve, reject) => {
        this.http.get(this.baseUrl + 'routers/default/index/routes' + this.apiKeyString).subscribe(
          (data: any) => {
            if(data !== {}){ resolve(data); } else { reject('l\'appel n\'a pas pu être atteint'); }
          }
        );
      }
    );
  }
}
