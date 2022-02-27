import { Component} from '@angular/core';
import { ServerService } from './server.service';
import {Response} from '@angular/http';
import { Router } from '@angular/router';

export interface userDetails{
  userid:number;
  username:string;
  role:string;
  schoolid:number;
  cityid:number;
  }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

constructor(private serverService:ServerService, private router:Router){

}

 currentUser:userDetails;

 ngOnInit()
 {
  this.serverService.checkCredentials("kanthi@gmail.com","abc123")
  .subscribe(
    (response:Response)=>{
      if(response != null)
      {
        this.currentUser = response.json();

        localStorage.setItem('username',this.currentUser.username);
        if(this.currentUser.role =="POC")
        {
 
          localStorage.setItem('schoolid',this.currentUser.schoolid.toString());
          localStorage.setItem('cityid',this.currentUser.cityid.toString());

        }
        else{
          localStorage.setItem('schoolid',null);
          localStorage.setItem('cityid',null);
        }
      }
    },
    (error)=>{
      console.log(error);
      this.router.navigateByUrl('/nodatafound');
    }
  );
 }
}
