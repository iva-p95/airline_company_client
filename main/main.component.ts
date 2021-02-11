import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Airline } from '../models/airline';
import { Booking } from '../models/booking';
import { BookingFilter } from '../models/bookingfilter';
import { City } from '../models/city';
import { Flight } from '../models/flight';
import { AirlineTicket } from '../models/ticket';
import { User } from '../models/user';
import { Type } from '../models/usertype';
import { MainService } from '../services/main.service';
import {UniquePipe} from '../uniquepipe'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  tickets!:AirlineTicket[]
  chooseTicketList:string[]=["all", "one way", "return tickets"];
  selectedOption:string ="";

  isAdmin:boolean=false;
  isUser:boolean=false;

  typeOfUser:string=window.localStorage.getItem("isAdmin")!;

  user:User=new User();

  airlines:Airline[]=[];

  selectedAirline:Airline=new Airline();
  selectedFlight:Flight=new Flight();

  flights:Flight[]=[];
  cities:string[]=[];

  ticket:AirlineTicket=new AirlineTicket();

  types:string[]=[];
  selectedType:string="";

  bookingList:Booking[]=[];

  bookingFilter:BookingFilter=new BookingFilter();

  ticketToCreate:AirlineTicket=new AirlineTicket();
  oneWay:string="";
  

  constructor(private mainService:MainService, private formBuilder:FormBuilder, private unique:UniquePipe) { 
    if(this.typeOfUser=="USER"){
      this.isUser=true;
      this.getBookingsForUser();
    }
    else {
      this.isAdmin = true;
    }
   }

   onAirlineChange(airline:Airline){
     this.selectedAirline=airline;
   }

   onFlightChange(flight:Flight){
     //console.log(event)
     console.log(flight)
     this.selectedFlight=flight;
     console.log("onFlightChange() "+JSON.stringify(this.selectedFlight))
   }

   createTicket(){
     this.ticketToCreate.airline=this.selectedAirline;
     this.ticketToCreate.flight=this.selectedFlight;
     if(this.oneWay=="true"){
       this.ticketToCreate.oneWay=true;
     } else if(this.oneWay=="false"){
       this.ticketToCreate.oneWay=false;
     }
     this.mainService.createTicket(this.ticketToCreate).subscribe(data => {
       console.log(data);
       this.getAllTickets();
     })
     
   }

  ngOnInit(): void {
    this.getAllTickets();
    this.getAirlines();
    this.getFlights();
    this.getTypes();
  }

  makeFilter(){
    this.mainService.getBookingsFiltered(this.bookingFilter).subscribe(data => {
      
      this.bookingList=data;
      this.bookingFilter.fromCityName="";
      this.bookingFilter.toCityName="";
      this.bookingFilter.departDate="";
      this.bookingFilter.returnDate="";
    
    })

  }

  getBookingsForUser(){
    this.mainService.getBookingsForUser().subscribe(data => {
      this.bookingList = data;

    })
  }

  getTypes(){
    this.mainService.getTypes().subscribe(data => {
      this.types = data;
    })
  }

  getCities(){
    this.mainService.getCities().subscribe(data => {
      console.log(data)
      this.cities=data;
    })

  }
  getFlights() {
    this.mainService.getFlights().subscribe(data => {
      console.log(data);
      this.flights = data;
    })
  }

  show(ticketForm: NgForm){
    
    console.log(" disdjsdisjd"+ticketForm.value.flight);
    console.log("ti "+ticketForm.value.oneWayTiketInput);
    console.log("ko "+ticketForm.value.airline);
    console.log("koji "+ticketForm.value.departDate);
    
    
  }

 
  getAirlines(){
    this.mainService.getAirlines().subscribe(data => {
      this.airlines = data;
    })
  }

  createUser(date:NgForm){
    console.log(this.selectedType);
    if(this.selectedType =="ADMIN"){
      this.user.userType = Type.ADMIN;

    } 
    else {
      this.user.userType = Type.USER;
    }
    console.log(this.user);
    this.mainService.createUser(this.user).subscribe(data => {
      console.log(data);
      this.user.username="";
      this.selectedType="";
      this.user.password="";
      

    },
    error=>  console.error(console.error())
    );
    
  }

  radioChangedHandler(event:any){
    this.selectedOption=event.target.value;
    if(this.selectedOption == "all"){
      this.getAllTickets();
    }
    else if(this.selectedOption == "one way") {
       this.getOneWayTickets();
    }
    else {
      this.getReturnTickets();

    }
    console.log(this.selectedOption);

  }

   getAllTickets() {
    this.mainService.getAllTickets().subscribe(data => {
      this.tickets = data;
    })
  }

  private getOneWayTickets() {
    this.mainService.getOneWayTickets().subscribe(data => {
      this.tickets = data;
    })
  }

  private getReturnTickets() {
    this.mainService.getReturnTickets().subscribe(data => {
      this.tickets = data;
    })
  }

}