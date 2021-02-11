import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Airline } from '../models/airline';
import { AirlineServiceService } from '../services/airline-service.service';

@Component({
  selector: 'app-airline-update',
  templateUrl: './airline-update.component.html',
  styleUrls: ['./airline-update.component.css']
})
export class AirlineUpdateComponent implements OnInit {

  airline:Airline=new Airline();

  constructor(private airlineService:AirlineServiceService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  updateAirline(){
    console.log(this.airline)
    this.airlineService.updateAirline(this.airline).subscribe(data => {
      this.router.navigate(['/airline'])
    })

  }

  goBack(){
    this.router.navigate(['/airline'])

  }

}
