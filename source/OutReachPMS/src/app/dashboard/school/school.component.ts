import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServerService } from 'app/server.service';
import {Response} from '@angular/http';


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {

  constructor(private router:Router,private serverService:ServerService, private route:ActivatedRoute) { }

  schoolSelected:number;
  citySelected:number;

  schools:any;

  months:any;

  chartDetails:any;

  attendance:string="";

  discipline:string="";

  homework:string="";

  dayCount:number=1;

  classes:any;

  groups:any;

  currentMonth:string;

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

 showBack:boolean=true;

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
            dur: 600,
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

bindModelSchool(){
  this.serverService.getClassesForSchool(this.schoolSelected)
  .subscribe(
    (response:Response) =>{
      this.classes = response.json();
    },
    (error) =>console.log(error)
  );
  this.serverService.getGroupPerformanceForSchool(this.schoolSelected)
  .subscribe(
    (response:Response) =>{
      this.groups = response.json();
    },
    (error) =>console.log(error)
  );

  this.serverService.getMonthsForChart()
  .subscribe(
    (response:Response) =>{
      this.months = response.json();

      this.serverService.getSchoolPerformanceMetrics(this.schoolSelected)
      .subscribe(
        (response:Response) =>{
          this.chartDetails = response.json();
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
        
        this.serverService.getSchoolPercentageIncr(this.schoolSelected)
        .subscribe((response:Response)=>{
        if(response.json()>=0)
        {
          document.getElementById("spSchoolInc").innerHTML=' <span class="text-success" ><i class="fa fa-long-arrow-up"></i>'+Math.abs(response.json()) +'% </span> increase in performance.';

        }
        else if(response.json()<0 ){
          document.getElementById("spSchoolInc").innerHTML=' <span class="text-danger" ><i class="fa fa-long-arrow-up"></i>'+Math.abs(response.json()) +'% </span> decrease in performance.';

        }
        });
        },
        (error) =>console.log(error)
      )
    },
    (error) =>console.log(error)
  );

  this.serverService.getStarDataForSchool(this.schoolSelected)
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

document.getElementById("dvSchoolAttendance").innerHTML=this.attendance;
document.getElementById("dvSchoolDiscipline").innerHTML=this.discipline;
document.getElementById("dvSchoolHomework").innerHTML=this.homework;
    },
    (error) =>console.log(error)
  );
}
  ngOnInit() {

    if(localStorage.getItem('schoolid').toString() != 'null')
    {
      this.showBack=false;
    }

    this.serverService.getsSchoolsList(this.route.snapshot.params['cityid'])
    .subscribe(
    (response:Response) =>{
      this.schools = response.json();
  
      this.route.params.subscribe(
        (params:Params)=>{

          if(params['id'] != undefined)
          {
            this.schoolSelected = +params['id'];
            this.citySelected = +params['cityid'];

            this.serverService.getAlterParameter(this.schoolSelected)
            .subscribe(
              (response:Response) =>{
               
                if(response.json().Attendance != null)
                {
                  this.alterParameter = response.json();
            
                }
               
              },
              (error) =>console.log(error)
            );
          }
          else{
            this.schoolSelected =  this.schools[0].schoolid;
          }
  
         this.bindModelSchool();
     
         this.serverService.getMaxMonthForSchool(this.schoolSelected)
  .subscribe(
    (response:Response)=>{
    this.currentMonth = response.json();
    }
  );
        }
      );
    },
    (error) =>console.log(error)
  );
  
  
  
  }

  onSchoolChange(event:any){

    this.schoolSelected=event.value;
  
    this.bindModelSchool();
    }

  goToClass(selectedClass){

    this.router.navigate(['/dashboard/class/'+selectedClass.ClassId+'/'+this.schoolSelected+'/'+this.citySelected]);
    }

  goToCity(){

     this.router.navigate(['/dashboard/city/'+this.citySelected]);
    }

  goToGroup(selectedGroup){

      this.router.navigate(['/dashboard/group/'+selectedGroup.GroupId+'/'+this.schoolSelected+'/'+this.citySelected]);
      }
}
