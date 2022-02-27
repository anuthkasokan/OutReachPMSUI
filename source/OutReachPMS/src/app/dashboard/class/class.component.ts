import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServerService } from 'app/server.service';
import {Response} from '@angular/http';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  constructor(private router:Router, private serverService:ServerService, private route:ActivatedRoute) { }

  classSelected:number;
  citySelected: number;
  schoolSelected:number;

  classes: any;

  months:any;

  chartDetails:any;

  attendance:string="";

  discipline:string="";

  homework:string="";

  dayCount:number=1;

  students:any;

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

bindClassModel(){
  this.serverService.getStudentListForClass(this.schoolSelected,this.classSelected)
  .subscribe(
    (response:Response) =>{
      this.students = response.json();
    },
    (error) =>console.log(error)
  );
  this.serverService.getGroupsForClass(this.schoolSelected,this.classSelected)
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

      this.serverService.getClassPerformanceMetrics(this.schoolSelected,this.classSelected)
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

        this.serverService.getClassPercentageIncr(this.schoolSelected, this.citySelected)
        .subscribe((response:Response)=>{
        if(response.json()>=0)
        {
          document.getElementById("spClassInc").innerHTML=' <span class="text-success" ><i class="fa fa-long-arrow-up"></i>'+Math.abs(response.json()) +'% </span> increase in performance.';

        }
        else if(response.json()<0 ){
          document.getElementById("spClassInc").innerHTML=' <span class="text-danger" ><i class="fa fa-long-arrow-up"></i>'+Math.abs(response.json()) +'% </span> decrease in performance.';

        }
        });
        },
        (error) =>console.log(error)
      )
    },
    (error) =>console.log(error)
  );

  this.attendance='';
  this.discipline='';
  this.homework='';
  this.dayCount=1;

  this.serverService.getStarDataForClass(this.schoolSelected,this.classSelected)
  .subscribe(
    (response:Response) =>{
      this.starData = response.json();

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

document.getElementById("dvClassAttendance").innerHTML=this.attendance;
document.getElementById("dvClassDiscipline").innerHTML=this.discipline;
document.getElementById("dvClassHomework").innerHTML=this.homework;
    },
    (error) =>console.log(error)
  );
}

  ngOnInit() {
    this.serverService.getClassList()
    .subscribe(
      (response:Response) =>{
        this.classes = response.json();
    
        this.route.params.subscribe(
          (params:Params)=>{
            if(params['id'] != undefined)
            {
              this.classSelected = +params['id'];
              this.schoolSelected = +params['schoolid'];
              this.citySelected = +params['cityid'];

              this.serverService.getAlterParameter(this.schoolSelected)
              .subscribe(
                (response:Response) =>{
                  this.alterParameter = response.json();
                },
                (error) =>console.log(error)
              );
            }
            else{
              this.classSelected =  this.classes[0].classid;
            }
    
              this.bindClassModel();
              this.serverService.getMaxMonth(this.schoolSelected,this.classSelected)
              .subscribe(
                (response:Response)=>{
                this.currentMonth = response.json();
                }
              );
          }
        );
      },
      (error) =>console.log(error)
    )
    

  }

  onClassChange(event:any){

  this.classSelected=event.value;

  this.bindClassModel();
  }

  goToStudent(student){

    this.router.navigate(['/dashboard/student/'+student.StudentId+'/'+this.classSelected +'/'+ this.schoolSelected+'/'+this.citySelected]);
    }

  goToSchool(){

      this.router.navigate(['/dashboard/school/'+ this.schoolSelected+'/'+this.citySelected]);
    }

  goToGroup(selectedGroup){

      this.router.navigate(['/dashboard/group/'+selectedGroup.GroupId+'/'+this.classSelected +'/'+this.schoolSelected+'/'+this.citySelected]);
      }
}
