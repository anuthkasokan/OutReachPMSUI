import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { Router, ActivatedRoute, Params } from '@angular/router';
import{Response} from '@angular/http';
import { ServerService } from 'app/server.service';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  constructor(private router:Router,private serverService:ServerService, private route:ActivatedRoute) { }

  citySelected:number;

  cities:any;

  schools:any;

  months:any;

  chartDetails:any;

  attendance:string="";

  discipline:string="";

  homework:string="";

  dayCount:number=1;

  increaseInPerformance:number;

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

  bindCityModel(){

    this.serverService.getSchoolListByCityId(this.citySelected)
    .subscribe(
      (response:Response) =>{
        this.schools = response.json();
      },
      (error) =>console.log(error)
    );

    this.serverService.getMonthsForChart()
    .subscribe(
      (response:Response) =>{
        this.months = response.json();

        this.serverService.getCityPerformanceMetrics(this.citySelected)
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

          this.serverService.getCityPercentageIncr(this.citySelected)
          .subscribe((response:Response)=>{
          if(response.json()>=0)
          {
            document.getElementById("spCityInc").innerHTML=' <span class="text-success" ><i class="fa fa-long-arrow-up"></i>'+Math.abs(response.json()) +'% </span> increase in performance.';

          }
          else if(response.json()<0 ){
            document.getElementById("spCityInc").innerHTML=' <span class="text-danger" ><i class="fa fa-long-arrow-up"></i>'+Math.abs(response.json()) +'% </span> decrease in performance.';

          }
          });

          },
          (error) =>console.log(error)
        );
      },
      (error) =>console.log(error)
    );

    this.serverService.getStarDataForCity(this.citySelected)
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

document.getElementById("dvCityAttendance").innerHTML=this.attendance;
document.getElementById("dvCityDiscipline").innerHTML=this.discipline;
document.getElementById("dvCityHomework").innerHTML=this.homework;
      },
      (error) =>console.log(error)
    );
  }

  ngOnInit() {
 
   
this.serverService.getCityList()
.subscribe(
  (response:Response) =>{
    this.cities = response.json();

    this.route.params.subscribe(
      (params:Params)=>{

        if(params['id'] != undefined)
        {
          this.citySelected = +params['id'];
        }
        else{
          this.citySelected =  this.cities[0].cityid;
        }
        this.bindCityModel();
      }
    );

    this.serverService.getMaxMonthForCity(this.citySelected)
    .subscribe(
      (response:Response)=>{
      this.currentMonth = response.json();
      }
    );

  },
  (error) =>console.log(error)
);


  }

  onCityChange(event:any){

    this.citySelected=event.value;
  
    this.bindCityModel();
    }
  
  onChange(event)
  {

  }
  goToSchool(school){

  this.router.navigate(['/dashboard/school/'+school.SchoolId+'/'+this.citySelected]);
  }
  
}
