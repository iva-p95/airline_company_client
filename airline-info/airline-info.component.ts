import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Airline } from '../models/airline';
import { AirlineTicket } from '../models/ticket';
import { AirlineServiceService } from '../services/airline-service.service';
import { ServiceTableService } from '../services/service-table.service';

@Component({
  selector: 'app-airline-info',
  templateUrl: './airline-info.component.html',
  styleUrls: ['./airline-info.component.css']
})
export class AirlineInfoComponent implements OnInit {

  airlines:Airline[]=[];
  selectedAirline:Airline=new Airline();
  tickets:AirlineTicket[]=[];
  idAirline!:number
  isAdmin:boolean=false;
  isUser:boolean=false;
  type:string=window.localStorage.getItem("isAdmin")!;
  newAirline:Airline=new Airline();

  constructor(private airlineService:AirlineServiceService, private router:Router, private service:ServiceTableService) { }

  ngOnInit(): void {
    this.getAirlines();
    if(this.type=="ADMIN"){
      this.isAdmin=true;

    }
    else {
      this.isUser=true;

    }
    
  }
  createAirline(){
    this.airlineService.createAirline(this.newAirline).subscribe(data =>{
      console.log(data);
      this.getAirlines();
      this.newAirline.name="";
    })
  }

  getTickets(){
    this.airlineService.getTickets(this.idAirline).subscribe(data => {
      console.log("vraceno "+ JSON.stringify(data));
      this.tickets=data;

    })
    
    
  }


  getAirlines(){
    this.airlineService.getAirlines().subscribe(data => {
      this.airlines=data;
    })

  }

  onItemChange(airline:Airline){
    this.selectedAirline=airline
    console.log(airline)
    this.idAirline=airline.id
    this.getTickets();
  }


  updateTicket(id:number){
    
    this.router.navigate(['/update', id])

  }

  deleteTicket(id:number){
    this.service.deleteTicket(id).subscribe(data => {
      this.getTickets();
    })
  }

  updateAirline(){
    console.log(this.selectedAirline)
    this.airlineService.updateAirline(this.selectedAirline).subscribe(data=>{
      console.log(data);
      this.getAirlines();
      this.selectedAirline.name="";
      //this.router.navigate(['/airline']);
    })
  }
  goBack(){
    this.router.navigate(["/airline"]);
  }
}
