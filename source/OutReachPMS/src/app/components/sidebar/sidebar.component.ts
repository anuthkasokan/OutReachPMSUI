import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
 const AdminRoutes: RouteInfo[] = [
    { path: '/dashboard/city', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/assignrole', title: 'Role Assignment',  icon:'person', class: '' },
    { path: '/upload', title: 'Upload/View',  icon:'content_paste', class: '' }
];

 const PocRoutes: RouteInfo[] = [
  { path: '/dashboard/school/'+localStorage.getItem('schoolid')+"/"+localStorage.getItem('cityid'), title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/upload', title: 'Upload/View',  icon:'content_paste', class: '' }
];

export const ROUTES:RouteInfo[]= (localStorage.getItem('schoolid').toString() == 'null' )?AdminRoutes: PocRoutes;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  username:string;

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.username=localStorage.getItem('username');
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
