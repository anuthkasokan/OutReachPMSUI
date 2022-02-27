import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  DatePipe } from '@angular/common';


import { RoleAssignmentComponent } from '../../role-assignment/role-assignment.component';

import { CityComponent } from 'app/dashboard/city/city.component';

import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  declarations: [
    RoleAssignmentComponent, 
    CityComponent
  ],
  exports:[
    RoleAssignmentComponent, 
    CityComponent
  ],
  providers:[ DatePipe]
})

export class AdminLayoutModule {}
