
import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServerService } from 'app/server.service';
import {Response} from '@angular/http';

export interface InputData {
    city: number;
    school: number;
    class:number;
    date:string;
  }

  export class OutputData{
    Attendance:string;
    Discipline:string;
    Homework:string;
    SchoolId:number;
    ClassId:number;
    EntryDate:string;
    StudentList:any[];
  }

@Component({
    selector: 'app-upload-sheet',
    templateUrl: './upload-sheet.component.html',
    styleUrls: ['./upload-sheet.component.css']
  })
  export class UploadSheetComponent implements OnInit{
    constructor(public dialogRef: MatDialogRef<UploadSheetComponent>,
        @Inject(MAT_DIALOG_DATA) public data: InputData,private serverService:ServerService) {}

    editField: string;

    outputData:OutputData={
      Attendance:"Attendance",
      Discipline:"Discipline",
      Homework:"Homework",
      SchoolId: this.data.school,
      ClassId:this.data.class,
      EntryDate : this.data.date,
      StudentList: []
    };

      performanceList: Array<any>;
      checkall = [];
      count=2;
      attendancechecked:boolean=false;
      disciplinechecked:boolean=false;
      homeworkchecked:boolean=false;
    
      updateList(id: number, property: string, event: any) {
        const editField = event.target.textContent;
        if(property == 'attendance')
        {
         this.outputData.Attendance = editField;
        }
        if(property =='discipline')
        {
         this.outputData.Discipline= editField;
        }
        if(property == 'homework')
        {
         this.outputData.Homework= editField;
        }

      }
    
    onNoClick(): void {
        this.dialogRef.close(-2);
      }

      checkedValue(dataChecked:boolean,parameter:string)
      {
          if(parameter == 'attendance' && this.attendancechecked)
          {
              return this.attendancechecked;
          }
          else if(parameter == 'discipline' && this.disciplinechecked)
          {
              return this.disciplinechecked;                    
          }
          else if(parameter == 'homework' && this.homeworkchecked)
          {
              return this.homeworkchecked;                      
          }

          return dataChecked;
      }

submitData(){

      var  table=document.getElementById("tblStudentData").getElementsByTagName('tr');
      this.outputData.StudentList =[];
      for(var i=2;i<=this.performanceList.length+1;i++)
      {
        var StudentId = table[i].cells[0].innerHTML;
        var Attendance = table[i].cells[3].getElementsByTagName('input')[0].checked?1:0;
        var Discipline = table[i].cells[4].getElementsByTagName('input')[0].checked?1:0;
        var Homework = table[i].cells[5].getElementsByTagName('input')[0].checked?1:0;

        var json = {'StudentId':parseInt(StudentId) , 'Attendance': Attendance,'Discipline':Discipline,
      'Homework':Homework};
       this.outputData.StudentList.push(json);
      }

      this.serverService.InsertManualData(this.outputData)
      .subscribe(
        (response:Response)=>{

         if(response.json()>0)
         {
          this.dialogRef.close(1);
         }
         else{
          this.dialogRef.close(0);
         }
        }
      );
}
   
ngOnInit(){

  this.serverService.getPerformanceListByDate(this.data.school,this.data.class,this.data.date)
  .subscribe(
    (response:Response) =>{
      this.performanceList = response.json();
    }
  );

 
}
  }