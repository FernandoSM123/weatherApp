import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { WeatherInfo } from 'src/app/models/weatherInfo';
import { ComponentService } from '../../services/component.service';
import {Utils1} from '../../utils/utils1';
import { Error } from '../../models/error';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit, OnChanges {

  @Input() public event1_State: boolean; //Estado del evento1:sidebar activado
  @Output() public event2 = new EventEmitter<Boolean>(); //Indica cuando se cambia la unidad de temperatura
  public celcius: boolean;
  public weatherInfo: WeatherInfo[]; //Contiene info del clima de 5 dias

  constructor(private componentService: ComponentService) {
    this.celcius = true;  //true==celcius | false==Fahrenheit
  }
  ngOnChanges(changes: SimpleChanges): void {
    //1- Cambiar estado del overlay
    if (this.event1_State) {
      document.getElementById("overlay").style.display = "block";
    }
    else if (!this.event1_State) {
      document.getElementById("overlay").style.display = "none";
    }
  }

  ngOnInit(): void {
    //Suscribirse al servicio de componente " weatherInfo"
    this.componentService.getWeather<WeatherInfo[]>().subscribe(weather => {
      this.weatherInfo = weather;

      //Establecer valor de la barra de progresion de la humedad
      var progressBar: HTMLElement = document.getElementById("progressBar");
      progressBar.setAttribute("style", "width: " + this.weatherInfo[0].humidity + "%");

      //Establecer imagenes respectivas
      this.setImageWeather();

      //Establecer imagen de direccion del viento
      this.setWindDirectionImage();
    });
  }

  //Establecer imagen de clima de los 5 dias siguientes
  setImageWeather() {
    for (let i: number = 1; i <= 5; i++) {
      var element: HTMLElement = document.getElementById("img" + i.toString());
      var imgUrl: string = Utils1.imageWeather(this.weatherInfo[i].weather_state_name);
      element.setAttribute("src", imgUrl);
      element.setAttribute("title", this.weatherInfo[i].weather_state_name);
    }
  }

  //change temperature unit
  changeTempUnit(value: boolean) {
    if (value == this.celcius)
      return;
    else {
      this.celcius = value;
      this.event2.emit(value);
      //Celcius to Fahrenheit
      if (!this.celcius)
        this.changeToFah();
      //Fahrenheit to Celcius
      else
        this.changeToCel();
    }
  }

  changeToFah() {
    let list01: HTMLCollection = document.getElementsByClassName("fah");
    let list02: HTMLCollection = document.getElementsByClassName("cel");
    for (let i: number = 0; i < list01.length; i++) {
      list01[i].classList.add("row", "d-flex", "justify-content-around");
      list02[i].classList.remove("row", "d-flex", "justify-content-around");
      list02[i].classList.add("d-none");
    }
  }

  changeToCel() {
    let list01: HTMLCollection = document.getElementsByClassName("cel");
    let list02: HTMLCollection = document.getElementsByClassName("fah");
    for (let i: number = 0; i < list01.length; i++) {
      list01[i].classList.add("row", "d-flex", "justify-content-around");
      list02[i].classList.remove("row", "d-flex", "justify-content-around");
      list02[i].classList.add("d-none");
    }
  }


  //Establecer imagen de acuerdo con la direccion del viento
  setWindDirectionImage(){
    let value:string=this.weatherInfo[0].wind_direction_compass;
    let element:HTMLElement=document.getElementById("windImg");
    let imgSrc=Utils1.imageWindDirection(value);
    element.setAttribute("src",imgSrc);
    element.setAttribute("title",value);
  }


}
