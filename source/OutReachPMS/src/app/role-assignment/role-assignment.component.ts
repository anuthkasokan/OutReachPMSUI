import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ServerService } from 'app/server.service';
import {Response} from '@angular/http';
import { MatSnackBar } from '@angular/material';

export interface user {
  userid: string;
  username: string;
}

@Component({
  selector: 'app-role-assignment',
  templateUrl: './role-assignment.component.html',
  styleUrls: ['./role-assignment.component.css']
})
export class RoleAssignmentComponent implements OnInit {

  constructor(private serverService:ServerService,private snackBar: MatSnackBar) { }

  myControl = new FormControl();

 
  filteredOptions: Observable<user[]>;

  roleCitySelected:number;

  userSelected:number=null;

  cities:any;

  users:any;

  schools: any;

  roles: any;

  roleSchoolSelected:number;
  roleSelected:number=null;

  poc:boolean=false;

  updateUserForm:FormGroup;

  ngOnInit() {
    
    this.serverService.getCityList()
    .subscribe(
  (response:Response) =>{
    this.cities = response.json();
    }
      );

    this.serverService.getUserList()
    .subscribe(
      (response:Response) =>{
        this.users = response.json();

        this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      },
      (error) =>console.log(error)
    );
  


    this.serverService.getRoleList()
    .subscribe(
      (response:Response) =>{
        this.roles = response.json();
      },
      (error) =>console.log(error)
    );

    this.updateUserForm = new FormGroup({
      'userid': new FormControl(null),
      'username': new FormControl(null),
      'roleid': new FormControl(null,Validators.required),
      'cityid': new FormControl(null,Validators.required),
      'schoolid': new FormControl(null,Validators.required)
    });
  }


  displayFn(user) {
    return user ? user.username : undefined;
  }

  onUserChange(value:any){

      this.roleSelected = value.roleid ;
      this.roleCitySelected = value.cityid;
      this.userSelected = value.userid;
   
      this.serverService.getsSchoolsList(this.roleCitySelected)
      .subscribe(
        (response:Response) =>{
          this.schools = response.json();
  
          this.roleSchoolSelected= value.schoolid;
        }
      );

      
      if(this.roleCitySelected >0)
      {
        this.poc = true;
      }
      else{
        this.poc = false;
      }
      
      document.getElementById('autoFormField').classList.remove("ng-untouched", "ng-pristine", "ng-invalid", "mat-form-field-invalid");

  }

  onRoleChange(event:any){
   // this.formControlValueChanged();
    if(event.value ==3)
    {
      this.poc = true;
  
    }
    else{
      this.poc = false;
    }
  }

  onCityChange(event:any){
    this.serverService.getsSchoolsList(event.value)
    .subscribe(
      (response:Response) =>{
        this.schools = response.json();

      }
    );
  }
  private _filter(value: any): user[] {
    const filterValue = ''//value.username.toLowerCase();

    return this.users.filter(option => option.username.toLowerCase().includes(filterValue));
  }



  onSubmit()
  {
    if(this.userSelected == undefined)
    {
      document.getElementById('autoFormField').classList.add("ng-untouched", "ng-pristine", "ng-invalid", "mat-form-field-invalid");
    }
    else{
      document.getElementById('autoFormField').classList.remove("ng-untouched", "ng-pristine", "ng-invalid", "mat-form-field-invalid");
    }
    if(this.roleSelected ==3 && (this.roleCitySelected <=0 || this.roleSchoolSelected <=0|| this.roleCitySelected == null || this.roleSchoolSelected == null))
    {
      this.snackBar.open("Please fill mandatory fields","", {
        duration: 5000,
      });
    }

    if(this.updateUserForm.status !="INVALID")
    {
     
      this.serverService.updateUserRole(this.updateUserForm)
      .subscribe(
        (response:Response)=>{
          if(response.json()>0)
          this.snackBar.open("Success!", "Role has been updated.", {
            duration: 5000,
          });
          else{
            this.snackBar.open("Failed!", "Role updating failed", {
              duration: 5000,
            });
          }
        }
      );
      
    }
    else{
      return false;
    }
  }
}
