import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AirlineTicket } from '../models/ticket';
import { TicketPage } from '../models/ticketpage';
import { ServiceTableService } from '../services/service-table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private service:ServiceTableService, private router:Router) { }

  ticketList:AirlineTicket[]=[];
  isAdmin:boolean=false;
  isUser:boolean=false;

  numberOfTickets!:number;
  

  makeReservation(ticket:AirlineTicket){
    console.log("NUMER OF TICKETS " + this.numberOfTickets)
    console.log("TICKET: " + ticket)
    this.service.makeReservation(this.numberOfTickets,ticket).subscribe(data => {
      console.log(data);
      this.getTickets();
    })
  }

  ngOnInit(): void {
     this.getTickets()
     if(window.localStorage.getItem("isAdmin")=="ADMIN"){
       this.isAdmin=true;
     } else {
       this.isUser=true;
     }

  }

  getTickets(){
    this.service.getTickets().subscribe(data => {
      console.log(data);
      this.ticketList=data;
    })
  }

  updateTicket(id:number){
    console.log('ee')
    this.router.navigate(['/update', id])

  }

  deleteTicket(id:number){
    this.service.deleteTicket(id).subscribe(data => {
      this.getTickets();
    })
  }
}
