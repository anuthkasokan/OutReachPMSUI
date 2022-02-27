import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServerService } from 'app/server.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  constructor(private router:Router, private serverService:ServerService, private route:ActivatedRoute) { }

  groupSelected:number;
  classSelected: any;
  schoolSelected:number;
  citySelected:number;


  fromSchool:boolean=false;
  fromClass:boolean=false;

  months:any;

  chartDetails:any;

  attendance:string="";

  discipline:string="";

  homework:string="";

  dayCount:number=1;

  classes:any;

  students:any;

  groups:any;

  currentMonth:any;

  starData:any = {
    Attendance: 0,
    Discipline:0,
    Homework:0,
    MonthlyTotal:0,
    StarAttendance:[''],
    StarDiscipline:[''],
    StarHomework:['']
 };
 
  alterParameter:any ={
    Attendance:"Attendance",
    Discipline:"Discipline",
    Homework:"Homework"
 };


  startAnimationForLineChart(chart){
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function(data) {
      if(data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if(data.type === 'point') {
            seq++;
            data.element.animate({
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
    });

    seq = 0;
};

bindModelGroup()
{

  if(this.classSelected != undefined && !isNaN(this.classSelected)) 
  {

    this.fromClass = true;

    this.serverService.getStudentWiseDataForGroup(this.groupSelected,this.schoolSelected,this.classSelected)
    .subscribe(
      (response:Response) =>{
        this.students = response.json();
      },
      (error) =>console.log(error)
    );

    this.serverService.getMaxMonth(this.schoolSelected,this.classSelected)
    .subscribe(
      (response:Response)=>{
      this.currentMonth = response.json();
      }
    );

    this.serverService.getMonthsForChart()
    .subscribe(
      (response:Response) =>{
        this.months = response.json();

        this.serverService.getGroupDataForClass(this.groupSelected,this.classSelected)
        .subscribe(
          (response:Response) =>{
            this.chartDetails = response.json();

            console.log(this.chartDetails);
            const dataDailySalesChart: any = {
              labels:this.months,
              series: new Array(this.chartDetails)
          };
        
        const optionsDailySalesChart: any = {
              lineSmooth: Chartist.Interpolation.cardinal({
                  tension: 0
              }),
              low: 0,
              high: 5000,
              chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
          }
        
          var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
        
          this.startAnimationForLineChart(dailySalesChart);

          this.serverService.getGroupForClassPercentageIncr(this.groupSelected, this.classSelected)
          .subscribe((response:Response)=>{
          if(response.json()>=0)
          {
            document.getElementById("spGroupInc").innerHTML=' <span class="text-success" ><i class="fa fa-long-arrow-up"></i>'+Math.abs(response.json()) +'% </span> increase in performance.';

          }
          else if(response.json()<0 ){
            document.getElementById("spGroupInc").innerHTML=' <span class="text-danger" ><i class="fa fa-long-arrow-up"></i>'+Math.abs(response.json()) +'% </span> decrease in performance.';

          }
          });
          },
          (error) =>console.log(error)
        )
      },
      (error) =>console.log(error)
    );

    this.serverService.getStarDataFromClass(this.groupSelected,this.classSelected)
    .subscribe(
      (response:Response) =>{
        this.starData = response.json();

this.attendance='';
this.discipline='';
this.homework='';
this.dayCount=1;

this.starData.StarAttendance.forEach(element => {
if(element =='green')
{
this.attendance = this.attendance+'<img src="../../../assets/img/GreenStar/'+this.dayCount+'.png" class="img'+this.dayCount+'" matTooltip="day'+this.dayCount+'" matTooltipClass="primary-tooltip">';
}else
if(element =='blue')
{
this.attendance = this.attendance+'<img src="../../../assets/img/BlueStar/'+this.dayCount+'.png" class="img'+this.dayCount+'" matTooltip="day'+this.dayCount+'" matTooltipClass="primary-tooltip">';
}else
if(element =='red')
{
this.attendance = this.attendance+'<img src="../../../assets/img/RedStar/'+this.dayCount+'.png" class="img'+this.dayCount+'" matTooltip="day'+this.dayCount+'" matTooltipClass="primary-tooltip">';
}else
if(element =='yellow')
{
this.attendance = this.attendance+'<img src="../../../assets/img/YellowStar/'+this.dayCount+'.png" class="img'+this.dayCount+'" matTooltip="day'+this.dayCount+'" matTooltipClass="primary-tooltip">';
}

this.dayCount++;
});

this.dayCount=1;

this.starData.StarDiscipline.forEach(element => {
if(element =='green')
{
this.discipline = this.discipline+'<img src="../../../assets/img/GreenStar/'+this.dayCount+'.png" class="img'+this.dayCount+'" matTooltip="day'+this.dayCount+'" matTooltipClass="primary-tooltip">';
}else
if(element =='blue')
{
this.discipline = this.discipline+'<img src="../../../assets/img/BlueStar/'+this.dayCount+'.png" class="img'+this.dayCount+'" matTooltip="day'+this.dayCount+'" matTooltipClass="primary-tooltip">';
}else
if(element =='red')
{
this.discipline = this.discipline+'<img src="../../../assets/img/RedStar/'+this.dayCount+'.png" class="img'+this.dayCount+'" matTooltip="day'+this.dayCount+'" matTooltipClass="primary-tooltip">';
}else
if(element =='yellow')
{
this.discipline = this.discipline+'<img src="../../../assets/img/YellowStar/'+this.dayCount+'.png" class="img'+this.dayCount+'" matTooltip="day'+this.dayCount+'" matTooltipClass="primary-tooltip">';
}

this.dayCount++;
});

this.dayCount=1;

this.starData.StarHomework.forEach(element => {
if(element =='green')
{
this.homework = this.homework+'<img src="../../../assets/img/GreenStar/'+this.dayCount+'.png" class="img'+this.dayCount+'" matTooltip="day'+this.dayCount+'" matTooltipClass="primary-tooltip">';
}else
if(element =='blue')
{
this.homework = this.homework+'<img src="../../../assets/img/BlueStar/'+this.dayCount+'.png" class="img'+this.dayCount+'" matTooltip="day'+this.dayCount+'" matTooltipClass="primary-tooltip">';
}else
if(element =='red')
{
this.homework = this.homework+'<img src="../../../assets/img/RedStar/'+this.dayCount+'.png" class="img'+this.dayCount+'" matTooltip="day'+this.dayCount+'" matTooltipClass="primary-tooltip">';
}else
if(element =='yellow')
{
this.homework = this.homework+'<img src="../../../assets/img/YellowStar/'+this.dayCount+'.png" class="img'+this.dayCount+'" matTooltip="day'+this.dayCount+'" matTooltipClass="primary-tooltip">';
}

this.dayCount++;
});

document.getElementById("dvGroupAttendance").innerHTML=this.attendance;
document.getElementById("dvGroupDiscipline").innerHTML=this.discipline;
document.getElementById("dvGroupHomework").innerHTML=this.homework;
      },
      (error) =>console.log(error)
    )

  }
  else{

    this.fromSchool=true;

    this.serverService.getClassWiseDataForGroup(this.groupSelected)
    .subscribe(
      (response:Response) =>{
        this.classes = response.json();
      },
      (error) =>console.log(error)
    );

    this.serverService.getMaxMonthForSchool(this.schoolSelected)
    .subscribe(
      (response:Response)=>{
      this.currentMonth = response.json();
      }
    );

    this.serverService.getMonthsForChart()
    .subscribe(
      (response:Response) =>{
        this.months = response.json();

        this.serverService.getGroupDataForSchool(this.groupSelected)
        .subscribe(
          (response:Response) =>{
            this.chartDetails = response.json();

            console.log(this.chartDetails);
            const dataDailySalesChart: any = {
              labels:this.months,
              series: new Array(this.chartDetails)
          };
        
        const optionsDailySalesChart: any = {
              lineSmooth: Chartist.Interpolation.cardinal({
                  tension: 0
              }),
              low: 0,
              high: 1200,
              chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
          }
        
          var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
        
          this.startAnimationForLineChart(dailySalesChart);

          this.serverService.getGroupForSchoolPercentageIncr(this.groupSelected)
          .subscribe((response:Response)=>{
          if(response.json()>=0)
          {
            document.getElementById("spGroupInc").innerHTML=' <span class="text-success" ><i class="fa fa-long-arrow-up"></i>'+Math.abs(response.json()) +'% </span> increase in performance.';

          }
          else if(response.json()<0 ){
            document.getElementById("spGroupInc").innerHTML=' <span class="text-danger" ><i class="fa fa-long-arrow-up"></i>'+Math.abs(response.json()) +'% </span> decrease in performance.';

          }
          });
          },
          (error) =>console.log(error)
        )
      },
      (error) =>console.log(error)
    );

    this.serverService.getStarDataFromSchool(this.groupSelected)
    .subscribe(
      (response:Response) =>{
        this.starData = response.json();

this.attendance='';
this.discipline='';
this.homework='';
this.dayCount=1;

this.starData.StarAttendance.forEach(element => {
if(element =='green')
{
this.attendance = this.attendance+'<img src="../../../assets/img/GreenStar/'+this.dayCount+'.png" class="img'+this.dayCount+'">';
}else
if(element =='blue')
{
this.attendance = this.attendance+'<img src="../../../assets/img/BlueStar/'+this.dayCount+'.png" class="img'+this.dayCount+'">';
}else
if(element =='red')
{
this.attendance = this.attendance+'<img src="../../../assets/img/RedStar/'+this.dayCount+'.png" class="img'+this.dayCount+'">';
}else
if(element =='yellow')
{
this.attendance = this.attendance+'<img src="../../../assets/img/YellowStar/'+this.dayCount+'.png" class="img'+this.dayCount+'">';
}

this.dayCount++;
});

this.dayCount=1;

this.starData.StarDiscipline.forEach(element => {
if(element =='green')
{
this.discipline = this.discipline+'<img src="../../../assets/img/GreenStar/'+this.dayCount+'.png" class="img'+this.dayCount+'">';
}else
if(element =='blue')
{
this.discipline = this.discipline+'<img src="../../../assets/img/BlueStar/'+this.dayCount+'.png" class="img'+this.dayCount+'">';
}else
if(element =='red')
{
this.discipline = this.discipline+'<img src="../../../assets/img/RedStar/'+this.dayCount+'.png" class="img'+this.dayCount+'">';
}else
if(element =='yellow')
{
this.discipline = this.discipline+'<img src="../../../assets/img/YellowStar/'+this.dayCount+'.png" class="img'+this.dayCount+'">';
}

this.dayCount++;
});

this.dayCount=1;

this.starData.StarHomework.forEach(element => {
if(element =='green')
{
this.homework = this.homework+'<img src="../../../assets/img/GreenStar/'+this.dayCount+'.png" class="img'+this.dayCount+'">';
}else
if(element =='blue')
{
this.homework = this.homework+'<img src="../../../assets/img/BlueStar/'+this.dayCount+'.png" class="img'+this.dayCount+'">';
}else
if(element =='red')
{
this.homework = this.homework+'<img src="../../../assets/img/RedStar/'+this.dayCount+'.png" class="img'+this.dayCount+'">';
}else
if(element =='yellow')
{
this.homework = this.homework+'<img src="../../../assets/img/YellowStar/'+this.dayCount+'.png" class="img'+this.dayCount+'">';
}

this.dayCount++;
});

document.getElementById("dvGroupAttendance").innerHTML=this.attendance;
document.getElementById("dvGroupDiscipline").innerHTML=this.discipline;
document.getElementById("dvGroupHomework").innerHTML=this.homework;
      },
      (error) =>console.log(error)
    )

  }
}

  ngOnInit() {

    this.serverService.getGroups(this.route.snapshot.params['schoolid'])
    .subscribe(
      (response:Response) =>{
        this.groups = response.json();
    
        this.route.params.subscribe(
          (params:Params)=>{
            console.log(params['id']);
            if(params['id'] != undefined)
            {
              this.classSelected = +params['classid'];
              this.schoolSelected = +params['schoolid'];
              this.groupSelected = +params['id'];
              this.citySelected = +params['cityid'];
  console.log( this.schoolSelected)
              this.serverService.getAlterParameter(this.schoolSelected)
              .subscribe(
                (response:Response) =>{
                  this.alterParameter = response.json();
                },
                (error) =>console.log(error)
              );

            }
            else{
              this.groupSelected =  this.groups[0].groupid;
            }

            this.bindModelGroup();

          }
        );
      },
      (error) =>console.log(error)
    );

    
  }

  onGroupChange(event:any){

    this.groupSelected=event.value;
  
    this.bindModelGroup();
    }
  

  goBack(){

    if(this.fromClass)
    this.router.navigate(['/dashboard/class/'+this.classSelected +'/'+ this.schoolSelected+'/'+this.citySelected]);
    else
    this.router.navigate(['/dashboard/school/'+ this.schoolSelected+'/'+this.citySelected]);
    }

 
}
