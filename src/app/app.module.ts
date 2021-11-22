import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  //Necesario para trabajar con HTTP

import { AppComponent } from './app.component';
import { AsideComponent } from './components/aside/aside.component';
import { SectionComponent } from './components/section/section.component';
import { MainComponent } from './components/main/main.component';
import {RoundPipe} from './pipes/round.pipe';
import {FahrenheitPipe} from './pipes/fahrenheit.pipe';

//Modulos de NgxSpinnerModule
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    SectionComponent,
    MainComponent,
    RoundPipe,
    FahrenheitPipe 
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //Se importa aqui tambien
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
