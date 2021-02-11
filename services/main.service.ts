import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { from, Observable } from 'rxjs';
import { Airline } from '../models/airline';
import { Booking } from '../models/booking';
import { BookingFilter } from '../models/bookingfilter';
import { City } from '../models/city';
import { Flight } from '../models/flight';
import { AirlineTicket } from '../models/ticket';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private ticketURL:string = 'http://localhost:8080/ticket';
  private userURL:string = 'http://localhost:8080/user'
  private airlineURL:string = 'http://localhost:8080/airline'
  private flightURL:string = 'http://localhost:8080/flight'
  private cityURL:string = 'http://localhost:8080/city'
  private bookingURL:string ='http://localhost:8080/booking'
  

  constructor(private httpClient:HttpClient) { }

  createTicket(ticket:AirlineTicket):Observable<AirlineTicket>{
    return this.httpClient.post<AirlineTicket>(this.ticketURL+"/add", ticket);

  }

  getBookingsFiltered(bookingFilter:BookingFilter):Observable<Booking[]>{
    return this.httpClient.post<Booking[]>(this.bookingURL+"/filtered",bookingFilter);
  }

  getBookingsForUser():Observable<Booking[]> {
    return this.httpClient.get<Booking[]>(this.bookingURL+"/all")
  }

  getCities():Observable<any[]> {
    return this.httpClient.get<any[]>(this.cityURL+"/all")

  }

  getTypes():Observable<any[]> {
    return this.httpClient.get<any[]>(this.userURL+"/types")
  }
  getFlights():Observable<Flight[]> {
    
    return this.httpClient.get<Flight[]>(this.flightURL+"/all",{headers:{'Context-type':'applicatoin/json'}});
  }

  getAirlines():Observable<Airline[]> {
    return this.httpClient.get<Airline[]>(this.airlineURL+"/all");
  }

  createUser(user:User):Observable<Object> {
    return this.httpClient.post(this.userURL+"/add", user);
  }

  getAllTickets():Observable<AirlineTicket[]> {
    return this.httpClient.get<AirlineTicket[]>(this.ticketURL+"/all");
  }

  getOneWayTickets():Observable<AirlineTicket[]> {
    return this.httpClient.get<AirlineTicket[]>(this.ticketURL+"/oneWay");
  }

  getReturnTickets():Observable<AirlineTicket[]> {
    return this.httpClient.get<AirlineTicket[]>(this.ticketURL+"/returnTickets");
  }

  
}
