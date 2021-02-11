import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AirlineTicket } from '../models/ticket';
import { ServiceTableService } from '../services/service-table.service';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent implements OnInit {

  id!:number;
  airlineTicket:AirlineTicket= new AirlineTicket();

  constructor(private tableService:ServiceTableService,private route:ActivatedRoute, private routeR:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.tableService.getTicket(this.id).subscribe(data =>{
      this.airlineTicket=data;

    })
  }

  updateTicket(){
    this.tableService.updateTicket(this.airlineTicket).subscribe(data =>{
      this.goToTableList();
    })

  }

  goToTableList(){
    this.routeR.navigate(['/table']);
  }

}
