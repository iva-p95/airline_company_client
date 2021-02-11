import { collectExternalReferences } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login-service';
import { Router } from '@angular/router';
import { ResponseAlo } from '../models/response';

@Component({
  selector: 'app-topcomponent',
  //template: ` <nav class="navbar navbar-light" style="background-color: #e3f2fd;">{{username}}  {{type}}</nav>`,
  templateUrl: './topcomponent.component.html',
  styleUrls: ['./topcomponent.component.css']
})
export class TopcomponentComponent  implements OnInit{

  isLoggedIn$?: Observable<boolean>;
  username!:string;
  type!:string;
  numberOfBookings!:Number
  
  routes = [
    {linkName: 'Main Page', url: '/main'},
    {linkName: 'Ticket Table', url: '/table'},
    {linkName: 'Airline Info', url:'/airline'}
  ]
  
  constructor(private service:LoginService, private router: Router) {
    this.isLoggedIn$ = this.service.isLoggedIn1;
    if(this.isLoggedIn$){
      this.username = window.localStorage.getItem("userName")!;
      this.type = window.localStorage.getItem("isAdmin")!;
      if(this.type == "USER"){
        
        this.numberOf()
      }
      
   }
  }
  ngOnInit(){ 
   
  }

  onLogout() {
   this.isLoggedIn$ = this.service.isLoggedIn1;
   this.username ="";
   this.type ="";
   this.service.logout()
   this.router.navigate(["/login"]);
 }

 numberOf(){
  this.service.getNumberOfBookings().subscribe(data => {
    this.numberOfBookings = data;
    
  })
}

 
   

}
