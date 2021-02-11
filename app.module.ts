import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Login1Component } from './login1/login1.component';
import { MainComponent } from './main/main.component';
import { TopcomponentComponent } from './topcomponent/topcomponent.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginService } from './services/login-service';
import { AuthInterceptor } from './auth/auth-interceptor';
import { CommonModule } from '@angular/common';
import { UniquePipe } from './uniquepipe';
import { TableComponent } from './table/table.component';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { AirlineInfoComponent } from './airline-info/airline-info.component';
import { AirlineUpdateComponent } from './airline-update/airline-update.component';



@NgModule({
  declarations: [
    AppComponent,
    Login1Component,
    MainComponent,
    TopcomponentComponent,
    UniquePipe,
    TableComponent,
    UpdateTicketComponent,
    AirlineInfoComponent,
    AirlineUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule
    
  ],
  exports:[
    UniquePipe
  ],
  providers: [
    AuthGuard, LoginService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
