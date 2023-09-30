import { Address } from "./address";

export class Employee {
    constructor(
        public name:string,
        public phone:string,
        public profile:string,
        public gender:string,
        public docsCheck:boolean,
        public address:Address
    ){}
}