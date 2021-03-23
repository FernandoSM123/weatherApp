import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Location} from '../models/location'; //contiene info de la ubicacion
import {WeatherInfo} from '../models/weatherInfo'; //contiene info del clima de 5 dias
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  //location
  private locationSource = new BehaviorSubject<any>("");
  //weatherInfo
  private weatherSource = new BehaviorSubject<any>("");

  constructor() { }

  setLocation<T>(location: T) {
    this.locationSource.next(location);
  }

  getLocation<T>():Observable<T>{
    return this.locationSource.asObservable();
  }

  setWeather<T>(weather: T) {
    this.weatherSource.next(weather);
  }

  getWeather<T>():Observable<T>{
    return this.weatherSource.asObservable();
  }

}
