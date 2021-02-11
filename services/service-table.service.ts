import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AirlineTicket } from '../models/ticket';
import { TicketPage } from '../models/ticketpage';

@Injectable({
  providedIn: 'root'
})
export class ServiceTableService {

  private ticketURL:string = 'http://localhost:8080/ticket';

  constructor(private httpClient:HttpClient) { }


  makeReservation(numberOfTickets:number, ticket:AirlineTicket){
    return this.httpClient.post(this.ticketURL+"/reserve/"+numberOfTickets,ticket);
  }

  deleteTicket(id:number){
    return this.httpClient.delete(this.ticketURL+"/delete/"+id)
  }

  getTickets():Observable<AirlineTicket[]>{
    return this.httpClient.get<AirlineTicket[]>(this.ticketURL+"/all");


  }

  getTicket(id:number):Observable<AirlineTicket>{
  
   
    return this.httpClient.get<AirlineTicket>(this.ticketURL+"/getById/"+id);

  }

  updateTicket(ticket:AirlineTicket):Observable<AirlineTicket>{
    return this.httpClient.post<AirlineTicket>(this.ticketURL+"/update",ticket);
  }
}
