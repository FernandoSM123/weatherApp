import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
    name: 'Fahrenheit'
})

export class FahrenheitPipe implements PipeTransform{

    transform(value:number){
        return Math.round(value * 9 / 5 + 32);
    }
}