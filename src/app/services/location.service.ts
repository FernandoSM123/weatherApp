import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //importo http client
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  private static readonly cors = "https://cors-anywhere-venky.herokuapp.com/"; //constante
  
  constructor(
    private http:HttpClient
  ) {}

  locationInfo1(lat,long):Observable<any> {
    const path = LocationService.cors+'https://www.metaweather.com/api/location/search/?lattlong='+lat+','+long;
    return this.http.get(path);
  }

  locationInfo2(query):Observable<any> {
    const path = LocationService.cors+'https://www.metaweather.com/api/location/search/?query='+query;
    return this.http.get(path);
  }

  weatherInfo(ID:number):Observable<any> {
    const path = LocationService.cors+'https://www.metaweather.com/api/location/'+ID;
    return this.http.get(path);
  }

}
