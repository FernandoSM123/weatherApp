import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Location } from '../../models/location';
import { WeatherInfo } from '../../models/weatherInfo';
import { LocationService } from '../../services/location.service';
import { ComponentService } from '../../services/component.service';
import { Utils1 } from '../../utils/utils1';
import { Error } from '../../models/error';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit, OnChanges {

  @Input() public event2_State: boolean; //Indica cuando se cambia la unidad de temperatura
  @Output() public event1 = new EventEmitter<Boolean>(); //Indica cuando el sidebar esta activo

  public location: Location; //Contiene info de la ubicacion
  public weatherInfo: WeatherInfo[]; //Contiene info del clima de 5 dias
  public posibleLocations: Location[]; //resultado con las ubicaciones de la busqueda
  public noResult:boolean=false;

  constructor(
    private locationService: LocationService,
    private componentService: ComponentService,
    private utils1: Utils1
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeTempUnit();
  }

  ngOnInit(): void {
    //Suscribirse al servicio de componente "location"
    this.componentService.getLocation<Location>().subscribe(location => {
      this.location = location;
    });
    //Suscribirse al servicio de componente " weatherInfo"
    this.componentService.getWeather<WeatherInfo[]>().subscribe(weather => {
      this.weatherInfo = weather;
      //Imagen de clima de dia actual
      this.setImageWeather();
    });
  }

  show() {
    this.noResult=false;
    this.event1.emit(true);
    document.getElementById("sidebar").classList.toggle("active");
  }

  closeWindow() {
    this.event1.emit(false);
    document.getElementById("sidebar").classList.toggle("active");
  }

  searchPosibleLocations() {
      var query: string = (<HTMLInputElement>document.getElementById("inputLocation")).value;
      this.posibleLocations = new Array(); //Reiniciar array
      this.requestWithLocations(query).then(response => {
        this.posibleLocations = response.locations;
        //no results
        if(this.posibleLocations.length==0){
          this.noResult=true;
        }
      },
      error=>{
        var currentError:Error=error;
        Utils1.showErrorData(currentError);
      });
  }

  //Realizar peticion con posibles posiciones
  requestWithLocations(query: String): Promise<any> {

    return new Promise((resolve, reject) => {
      //Realiza peticion para obtener posibles posiciones
      this.locationService.locationInfo2(query).subscribe(
        response => {
          resolve({ locations: response });
        },
        error => {
          reject(error);
        });
    });
  }


  //Establecer imagen del clima de dia actual 
  setImageWeather() {
    var element: HTMLElement = document.getElementById("imgToday");
    var imgUrl: string = Utils1.imageWeather(this.weatherInfo[0].weather_state_name);
    element.setAttribute("src", imgUrl);
    element.setAttribute("title", this.weatherInfo[0].weather_state_name);
  }


  //cambiar unidad de temperatura
  changeTempUnit() {
    if (this.event2_State == undefined)
      return;
    else {
      if (!this.event2_State)
        this.changeToFah();
      else
        this.changeToCel();
    }
  }

  changeToFah() {
    let list01: HTMLCollection = document.getElementsByClassName("fah");
    let list02: HTMLCollection = document.getElementsByClassName("cel");
    list01[0].classList.add("text-center", "text-light", "mt-5", "mb-5");
    list02[0].classList.remove("text-center", "text-light", "mt-5", "mb-5");
    list02[0].classList.add("d-none");
  }

  changeToCel() {
    let list01: HTMLCollection = document.getElementsByClassName("cel");
    let list02: HTMLCollection = document.getElementsByClassName("fah");
    list01[0].classList.add("text-center", "text-light", "mt-5", "mb-5");
    list02[0].classList.remove("text-center", "text-light", "mt-5", "mb-5");
    list02[0].classList.add("d-none");
  }

  //cambiar ubicacion actual
  changeCurrentLocation(pos: Location) {

    //cambiar ubicacion actual
    this.location = pos;
    this.utils1.getWeatherInfo(this.location.woeid).then(pos => {
      this.componentService.setWeather<WeatherInfo[]>(pos.weatherInfo); //Establecer informacion del clima en el servicio
      this.weatherInfo = pos.weatherInfo;
      console.log("NUEVA INFO:");
      console.log(this.location);
      console.log(this.weatherInfo);
      //Cerrar sidebar
      this.event1.emit(false);
      document.getElementById("sidebar").classList.toggle("active");
    },
    error=>{
      var currentError:Error=error;
      Utils1.showErrorData(currentError);
    });
  }

  //cambiar posicion a su valor de inicio con base en la latitud y longitud
  restoreCurrentLocation() {

    this.utils1.getPosition().then(pos1 => {
      this.componentService.setLocation<Location>(pos1.location); //Establecer posicion en el servicio
      this.location = pos1.location;
      this.utils1.getWeatherInfo(this.location.woeid).then(pos2 => {
        this.componentService.setWeather<WeatherInfo[]>(pos2.weatherInfo); //Establecer informacion del clima en el servicio
        this.weatherInfo = pos2.weatherInfo;
      },
      error1=>{
        var currentError:Error=error1;
        Utils1.showErrorData(currentError);
      });
    },
    error2=>{
      var currentError:Error=error2;
      Utils1.showErrorData(currentError);
    });
  }

}
