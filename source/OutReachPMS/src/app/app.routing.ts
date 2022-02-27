import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { RoutingComponent } from './routing/routing.component';

const routes: Routes =[
 {
    path: '',
    component: RoutingComponent, 
    children: [
        {
      path: '',
      loadChildren: './routing/routing.module#RoutingModule'
  }]}

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{onSameUrlNavigation: "reload"})
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
