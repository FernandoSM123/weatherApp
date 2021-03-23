export class WeatherInfo {

    constructor(
        public max_temp:number,
        public min_temp:number,
        public the_temp:number,
        public weather_state_name:string,
        public humidity:number,
        public visibility:number,
        public air_pressure:number,
        public wind_direction:number,
        public wind_direction_compass:string,
        public wind_speed:number,
        public applicable_date:Date
    ) { }
}