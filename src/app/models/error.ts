export class Error
{
    constructor(
        public message:string,
        public name:string,
        public status:number,
        public statusText:string
    ){}
}