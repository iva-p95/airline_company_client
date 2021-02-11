import { Flight } from "./flight"
import { AirlineTicket } from "./ticket"

export class Booking {
    id!:number;
    isAvailable!:boolean;
    flight!:Flight;
    airlineTicket!:AirlineTicket;
}