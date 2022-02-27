import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ServerService } from 'app/server.service';
import { ActivatedRoute,Params, Router } from '@angular/router';
import {Response} from '@angular/http';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(private router:Router, private serverService:ServerService , private route:ActivatedRoute) { }

  students:any;
  dailyperformance:any;
  studentSelected:number;
  classSelected:number;
  schoolSelected:number;
  citySelected:number;

  months:any;

  chartDetails:any;

  attendance:string="";

  discipline:string="";

  homework:string="";

  dayCount:number=1;

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

bindModelStudent()
{
  this.serverService.getDailyStudentPerformance(this.studentSelected)
  .subscribe(
    (response:Response) =>{
      this.dailyperformance = response.json();
    },
    (error) =>console.log(error)
  )

  this.serverService.getMonthsForChart()
  .subscribe(
    (response:Response) =>{
      this.months = response.json();

      this.serverService.getStudentPerformanceMetrics(this.studentSelected)
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
            high: 1000,
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
        }
      
        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
      
        this.startAnimationForLineChart(dailySalesChart);

        this.serverService.getStudentPercentageIncr(this.studentSelected)
        .subscribe((response:Response)=>{
        if(response.json()>=0)
        {
          document.getElementById("spStudentInc").innerHTML=' <span class="text-success" ><i class="fa fa-long-arrow-up"></i>'+Math.abs(response.json()) +'% </span> increase in performance.';

        }
        else if(response.json()<0 ){
          document.getElementById("spStudentInc").innerHTML=' <span class="text-danger" ><i class="fa fa-long-arrow-up"></i>'+Math.abs(response.json()) +'% </span> decrease in performance.';

        }
        });
        },
        (error) =>console.log(error)
      )
    },
    (error) =>console.log(error)
  )

  this.serverService.getStarDataForStudent(this.studentSelected)
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

document.getElementById("dvStudentAttendance").innerHTML=this.attendance;
document.getElementById("dvStudentDiscipline").innerHTML=this.discipline;
document.getElementById("dvStudentHomework").innerHTML=this.homework;
    },
    (error) =>console.log(error)
  )
};

  ngOnInit() {

    this.serverService.getStudentList(this.route.snapshot.params['classid'],this.route.snapshot.params['schoolid'])
.subscribe(
  (response:Response) =>{
    this.students = response.json();

    this.route.params.subscribe(
      (params:Params)=>{

        if(params['id'] != undefined)
        {
          this.studentSelected = +params['id'];
          this.classSelected = +params['classid'];
          this.schoolSelected = +params['schoolid'];
          this.citySelected = +params['cityid'];

          this.serverService.getAlterParameter(this.schoolSelected)
          .subscribe(
            (response:Response) =>{
              this.alterParameter = response.json();
            },
            (error) =>console.log(error)
          );

          this.serverService.getMaxMonth(this.schoolSelected,this.classSelected)
          .subscribe(
            (response:Response)=>{
            this.currentMonth = response.json();
            }
          );
        }
        else{
          this.studentSelected =  this.students[0].studentid;
        }

       this.bindModelStudent();

      }
    );
  },
  (error) =>console.log(error)
);

  }

  onStudentChange(event:any){

    this.studentSelected=event.value;
  
    this.bindModelStudent();
    }

  goToClass()
  {
    this.router.navigate(['/dashboard/class/'+this.classSelected,this.schoolSelected,this.citySelected]);
  }

  
}
