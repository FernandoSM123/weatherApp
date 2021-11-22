import { Component, OnInit,OnDestroy } from '@angular/core';
import {Location} from '../../models/location'; //contiene info de la ubicacion
import {WeatherInfo} from '../../models/weatherInfo'; //contiene info del clima de 5 dias
import {ComponentService} from '../../services/component.service';
import {Utils1} from '../../utils/utils1';
import { Error } from '../../models/error';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public currentLocation:Location; //almacena posicion actual
  public daysWeatherInfo:WeatherInfo[]; //almacena info del clima de 5 dias
  public lat:any;  //latitud
  public long:any; //longitud
  public currentDate:Date; //fecha actual
  public event1:boolean; //Estado del "sidebar"
  public event2:boolean; //Cambiar unidad de temperatura

  constructor(
  private componentService: ComponentService,
  private utils1:Utils1,
  private spinner: NgxSpinnerService
  )
  {
    this.currentDate=new Date();
  }

  receiveEvent1($event){
    this.event1=$event;
  }

  receiveEvent2($event){
    this.event2=$event;
  }
 

  ngOnInit(): void {
    this.spinner.show();
    this.utils1.getLatt_long().then(pos1=>
      {
         Utils1.lat=pos1.lat;
         Utils1.long=pos1.lng;
         this.utils1.getPosition().then(pos2=>
          {
            this.componentService.setLocation<Location>(pos2.location); //Establecer posicion en el servicio
            this.currentLocation=pos2.location;
            this.utils1.getWeatherInfo(this.currentLocation.woeid).then(pos3=>
              {
                this.componentService.setWeather<WeatherInfo[]>(pos3.weatherInfo); //Establecer informacion del clima en el servicio
                this.daysWeatherInfo=pos3.weatherInfo;
                this.spinner.hide(); //Ocultar sipnner cuando la informacion esta lista
                console.log("INFO DE INICIO:");
                console.log(this.currentLocation);
                console.log(this.daysWeatherInfo);
              },
              error1=>{
                var currentError:Error=error1;
                this.spinner.hide();
                Utils1.showErrorData(currentError);
              });
          },
          error2=>{
            var currentError:Error=error2;
            this.spinner.hide();
            Utils1.showErrorData(currentError);
          });
      },
      error3=>{
        var errorMessage:string=Utils1.handleGeoError(error3);
        this.spinner.hide();
        alert("ERROR:" + '\n'
        + "1) ERROR MESSAGE: " + errorMessage);
      });
  }

}
