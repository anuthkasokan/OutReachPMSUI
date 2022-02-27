import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChildRoutes } from './routing.routing';
import { RouterModule } from '@angular/router';
import { AdminLayoutModule } from './admin-layout/admin-layout.module';
import { PocLayoutModule } from './poc-layout/poc-layout.module';


@NgModule({
  imports: [  
    RouterModule.forChild(ChildRoutes),
    AdminLayoutModule,
    PocLayoutModule
  ],
  declarations: [
  ],
  providers:[ DatePipe]
})
export class RoutingModule { }
