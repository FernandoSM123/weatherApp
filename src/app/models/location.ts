export class Location
{
    constructor(
        public distance:number,
        public title:string,
        public location_type:string,
        public woeid:number,
        public latt_long:string,
    ){}
}