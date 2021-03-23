import { Location } from '../models/location'; //contiene info de la ubicacion
import { LocationService } from '../services/location.service'; //servicio para obtener localizacion
import { Injectable } from '@angular/core';
import { Error } from '../models/error';

//NOTA:No se pueden utlizar atributos de una clase en un metodo estatico

@Injectable({
  providedIn: 'root'
})
export class Utils1 {

  public static lat: Number;  //latitud
  public static long: Number; //longitud

  constructor(private locationService: LocationService
  ) { }

  //Obtener latitud y longitud
  getLatt_long(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }

  //Obtener posicion con base en la latitud y longitud
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.locationService.locationInfo1(Utils1.lat, Utils1.long).subscribe(
        response => {
          var locations: Location[];
          locations = response;
          resolve({ location: locations[0] });
        },
        error => {
          reject(error);
        });
    });
  }

  //Obtener informacion del clima 
  getWeatherInfo(ID: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.locationService.weatherInfo(ID).subscribe(
        response => {
          resolve({ weatherInfo: response.consolidated_weather });
        },
        error => {
          reject(error);
        });
    });
  }

  //Establecer imagen del clima
  static imageWeather(value: string) {

    switch (value) {
      case "Snow":
        return "../../../assets/images/Snow.png";

      case "Sleet":
        return "../../../assets/images/Sleet.png";

      case "Hail":
        return "../../../assets/images/Hail.png";

      case "Thunder":
        return "../../../assets/images/Thunderstorm.png";

      case "Heavy Rain":
        return "../../../assets/images/HeavyRain.png";

      case "Light Rain":
        return "../../../assets/images/LightRain.png";

      case "Showers":
        return "../../../assets/images/Shower.png";

      case "Heavy Cloud":
        return "../../../assets/images/HeavyCloud.png";

      case "Light Cloud":
        return "../../../assets/images/LightCloud.png";

      case "Clear":
        return "../../../assets/images/Clear.png";
    }
  }


  //Establecer imagen del clima
  static imageWindDirection(value: string) {

    switch (value) {

      case "N":
        return "../../../assets/images/windRose/North.png";

      case "S":
        return "../../../assets/images/windRose/Sourth.png";

      case "E":
        return "../../../assets/images/windRose/East.png";

      case "W":
        return "../../../assets/images/windRose/West.png";

      //North to East
      case "NNE":
        return "../../../assets/images/windRose/NorthEast.png";

      case "NE":
        return "../../../assets/images/windRose/NorthEast.png";

      case "ENE":
        return "../../../assets/images/windRose/NorthEast.png";

      //East to Sourth
      case "ESE":
        return "../../../assets/images/windRose/SourthEast.png";

      case "SE":
        return "../../../assets/images/windRose/SourthEast.png";

      case "SSE":
        return "../../../assets/images/windRose/SourthEast.png";

      //Sourth to West
      case "SSW":
        return "../../../assets/images/windRose/SourthWest.png";

      case "SW":
        return "../../../assets/images/windRose/SourthWest.png";

      case "WSW":
        return "../../../assets/images/windRose/SourthWest.png";

      //West to North
      case "WNW":
        return "../../../assets/images/windRose/NorthWest.png";

      case "NW":
        return "../../../assets/images/windRose/NorthWest.png";

      case "NNW":
        return "../../../assets/images/windRose/NorthWest.png";
    }
  }

  //Mostrar datos del error
  static showErrorData(error: Error) {
    alert("ERROR: " + '\n'
      + "1) STATUS: " + error.status + '\n'
      + "2) NAME: " + error.name + '\n'
      + "3) STATUS TEXT: " + error.statusText + '\n'
      + "4) MESSAGE: " + error.message);
  }


  //geolocation errors
  static handleGeoError(error: any) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "User does not want to display location";
      case error.POSITION_UNAVAILABLE:
        return "Can't determine user's location";
      case error.TIMEOUT:
        return "The request for geolocation info timed out";
    }
  }

}