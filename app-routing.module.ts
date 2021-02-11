import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirlineInfoComponent } from './airline-info/airline-info.component';
import { AirlineUpdateComponent } from './airline-update/airline-update.component';
import { AuthGuard } from './auth/auth.guard';
import { Login1Component } from './login1/login1.component';
import { MainComponent } from './main/main.component';
import { TableComponent } from './table/table.component';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';

const routes: Routes = [
  {path: '', component: Login1Component, canActivate: [AuthGuard]},
  {path:'login', component: Login1Component},
  {path: 'main', component: MainComponent},
  {path: 'table', component: TableComponent},
  {path: 'update/:id', component: UpdateTicketComponent},
  {path: 'airline', component: AirlineInfoComponent},
  {path: 'airlineUpdate/:id', component: AirlineUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
