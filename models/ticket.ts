import { Airline } from './airline';
import { Flight } from './flight';




export class AirlineTicket {
    id!:number;
    airline!:Airline;
    oneWay!:boolean;
    departDate!:Date;
    returnDate!:Date;
    flight!:Flight;
    numberOfTickets!:number;

    /*constructor(id:number, airline:Airline, oneWay:boolean, departDate:Date, 
        returnDate:Date, flight:Flight, numberOfTickets:number){
            this.id=id;
            this.airline=airline;
            this.oneWay=oneWay;
            this.departDate=departDate;
            this.returnDate=returnDate;
            this.flight=flight;
            this.numberOfTickets=numberOfTickets;

        } */
}