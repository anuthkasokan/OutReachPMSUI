import { Component, OnInit } from '@angular/core';
import { MatDialog,MatSnackBar } from '@angular/material';
import { ServerService } from 'app/server.service';
import {Response} from '@angular/http';
import { UploadSheetComponent } from './upload-sheet/upload-sheet.component';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

   
  constructor(private serverService:ServerService, private dialog: MatDialog, private datepipe:DatePipe,private snackBar: MatSnackBar) { 
    
  }


  editField: string;
  showFilter:boolean=false;
  filterCitySelected:number;
  filterSchoolSelected:number;
  filterClassSelected:number;
  filterDateSelected:Date;
  result:string;
  cities:any;
  schools:any;
  classes:any;
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  maxDate = new Date(this.currentYear,this.currentMonth+1,0);
  showSuccess:boolean=false;
  showFailed:boolean=false;
  validEntry:boolean= false;

onCLickView(){
  if(this.showFilter == true){
    this.showFilter = false;
  }
  else{
    this.showFilter= true;
  }
 
}

onCityChange(event)
{
  this.filterCitySelected=event.value;
  this.serverService.getsSchoolsList(event.value)
  .subscribe(
    (response:Response) =>{
      this.schools = response.json();

    }
  );
}

onSchoolChange(event)
{
  this.filterCitySelected=event.value;
  this.serverService.getClassList()
  .subscribe(
    (response:Response) =>{
      this.classes = response.json();

    }
  );
}

uploaded(event)
{

}
onClassChange(event)
{
  this.filterClassSelected=event.value;
}

openDialog(): void {

  if(this.filterCitySelected == undefined)
  {
    this.validEntry= true;
    document.getElementById('city').classList.add("ng-untouched", "ng-pristine", "ng-invalid", "mat-form-field-invalid");
  }
  else{
    this.validEntry= false;
    document.getElementById('city').classList.add("ng-untouched", "ng-pristine", "ng-invalid", "mat-form-field-invalid");
  }

  if(this.filterSchoolSelected == undefined)
  {
    this.validEntry= true;
    document.getElementById('school').classList.add("ng-untouched", "ng-pristine", "ng-invalid", "mat-form-field-invalid");
  }
  else{
    this.validEntry= false;
    document.getElementById('school').classList.add("ng-untouched", "ng-pristine", "ng-invalid", "mat-form-field-invalid");
  }

  if( this.filterClassSelected == undefined )
  {
    this.validEntry= true;
    document.getElementById('class').classList.add("ng-untouched", "ng-pristine", "ng-invalid", "mat-form-field-invalid");
  }
  else{
    this.validEntry= false;
    document.getElementById('class').classList.add("ng-untouched", "ng-pristine", "ng-invalid", "mat-form-field-invalid");
  }

  if(this.filterDateSelected == undefined )
  {
    this.validEntry= true;
    document.getElementById('addDate').classList.add("ng-untouched", "ng-pristine", "ng-invalid", "mat-form-field-invalid");
  }
  else{
    this.validEntry= false;
    document.getElementById('addDate').classList.add("ng-untouched", "ng-pristine", "ng-invalid", "mat-form-field-invalid");
  }


  if(this.validEntry == false){
    const dialogRef = this.dialog.open(UploadSheetComponent, {

      data: {city: this.filterCitySelected ,school: this.filterSchoolSelected,class: this.filterSchoolSelected, date: this.datepipe.transform(this.filterDateSelected, 'yyyy-MM-dd')}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      if(result >0)
      {
        this.snackBar.open("Success!", "Data has been uploaded.", {
          duration: 2000,
        });
      }
      else if(result==0){
  
        this.snackBar.open("Failed!", "Data uploading has failed.", {
          duration: 2000,
        });
      }
    });
  }
  else{
    this.snackBar.open("Please enter valid data.", "",{
      duration: 2000,
    });
  }
 
}

  ngOnInit() {

    this.serverService.getCityList()
.subscribe(
  (response:Response) =>{
    this.cities = response.json();

      });
    

}
}
