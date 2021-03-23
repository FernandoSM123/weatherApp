import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  //Necesario para trabajar con HTTP

import { AppComponent } from './app.component';
import { AsideComponent } from './components/aside/aside.component';
import { SectionComponent } from './components/section/section.component';
import { MainComponent } from './components/main/main.component';
import {RoundPipe} from './pipes/round.pipe';
import {FahrenheitPipe} from './pipes/fahrenheit.pipe';

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
    HttpClientModule //Se importa aqui tambien
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
