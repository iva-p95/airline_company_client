import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Airline } from '../models/airline';
import { AirlineTicket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class AirlineServiceService {

  private airlineURL:string='http://localhost:8080/airline'
  private ticketURL:string='http://localhost:8080/ticket'

  constructor(private httpClient:HttpClient) { }

  updateAirline(airline:Airline):Observable<Airline>{
    return this.httpClient.post<Airline>(this.airlineURL+"/add",airline);
  }

  getAirlines():Observable<Airline[]>{
    return this.httpClient.get<Airline[]>(this.airlineURL+"/all");

  }

  getTickets(id:number):Observable<AirlineTicket[]>{
    return this.httpClient.get<AirlineTicket[]>(this.ticketURL+"/ticketsAll/"+id);
  }

  createAirline(airline:Airline):Observable<Airline>{
    return this.httpClient.post<Airline>(this.airlineURL+"/add",airline);
  }
}
