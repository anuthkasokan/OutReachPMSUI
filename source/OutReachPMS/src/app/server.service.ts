import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { OutputData } from "./upload/upload-sheet/upload-sheet.component";


export interface star {
   Attendance: number;
   Discipline: number;
   Homework:number;
   MonthlyTotal:number;
   StarAttendance:Array<string>;
   StarDiscipline:Array<string>;
   StarHomework:Array<string>;
 }
 
 export interface alter{
   Attendance: string;
   Discipline: string;
   Homework:string;
 }

const headers= new Headers({'Access-Control-Allow-Origin':'http://localhost:4200'
,'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
'content-type':'application/json'
});

var url = 'http://localhost:49572/';

@Injectable()
export class ServerService{
constructor(private http:Http){}



checkCredentials(username:string,password:string)
{
return this.http.get(url+'api/details/'+username+"/"+password,{headers:headers})
}

getMonthsForChart()
{
   return this.http.get(url+"api/chart/months",{headers:headers}); 
}

getMaxMonth(schoolid,classid)
{
   return this.http.get(url+"api/details/getmonth/"+schoolid+"/"+classid,{headers:headers})
}

getMaxMonthForCity(cityId)
{
   return this.http.get(url+"api/details/getmonth/"+cityId,{headers:headers})
}

getMaxMonthForSchool(schoolid)
{
   return this.http.get(url+"api/details/getmonthforschool/"+schoolid,{headers:headers})
}

getAlterParameter(schoolid:number)
{
   return this.http.get(url+"api/details/alter/"+schoolid,{headers:headers}); 
}

//region city component
getCityPerformanceMetrics(cityid:number)
{
   return this.http.get(url+"api/chart/"+cityid,{headers:headers}); 

}

getCityPercentageIncr(cityid:number)
{
   return this.http.get(url+"api/chart/inc/"+cityid,{headers:headers}); 
}

 getCityList(){

    return this.http.get(url+"api/details/cities",{headers:headers});
 }


 getSchoolListByCityId(cityid:number){

    return this.http.get(url+"api/details/schoolsforcity/"+cityid,{headers:headers});
 }

 getStarDataForCity(cityid:number){

   return this.http.get(url+"api/star/"+cityid,{headers:headers}); 
 }
 // region end city

//region class component
 getClassList(){

    return this.http.get(url+"api/details/classes",{headers:headers});
 }

 getStudentListForClass(schoolid:number,classid:number)
 {
   return this.http.get(url+"api/details/studentsforclass/"+schoolid+"/"+classid,{headers:headers});
 }

 getGroupsForClass(schoolid:number,classid:number)
 {
   return this.http.get(url+"api/details/group/"+schoolid+"/"+classid,{headers:headers});
 }

 getClassPerformanceMetrics(schoolid:number,classid:number)
{
   return this.http.get(url+"api/chart/"+schoolid+"/"+classid,{headers:headers}); 
}

getStarDataForClass(schoolid:number,classid:number){

   return this.http.get(url+"api/star/class/"+schoolid+"/"+classid,{headers:headers}); 
 }

 getClassPercentageIncr(schoolid:number,classid:number)
{
   return this.http.get(url+"api/chart/inc/class/"+schoolid+"/"+classid,{headers:headers}); 
}
//region end class

//region School component

getsSchoolsList(cityid:number)
{
   return this.http.get(url+"api/details/schools/"+cityid,{headers:headers});
}

getClassesForSchool(schoolid:number)
{
   return this.http.get(url+"api/details/classesforschool/"+schoolid,{headers:headers});
}

getGroupPerformanceForSchool(schoolid:number)
{
   return this.http.get(url+"api/details/groupperformance/"+schoolid,{headers:headers});
}

getSchoolPerformanceMetrics(schoolid:number)
{
   return this.http.get(url+"api/chart/school/"+schoolid,{headers:headers}); 
}

getStarDataForSchool(schoolid:number){

   return this.http.get(url+"api/star/school/"+schoolid,{headers:headers}); 
 }

 getSchoolPercentageIncr(schoolid:number)
{
   return this.http.get(url+"api/chart/inc/school/"+schoolid,{headers:headers}); 
}
//region end school

//region student component
 getStudentList(classid,schoolid){

    return this.http.get(url+"api/details/students/"+classid+'/'+schoolid,{headers:headers});
 }

 getDailyStudentPerformance(studentid){

    return this.http.get(url+"api/details/individual/"+studentid,{headers:headers});
 }

 getStudentPerformanceMetrics(studentid:number)
{
   return this.http.get(url+"api/chart/student/"+studentid,{headers:headers}); 
}

 getStarDataForStudent(studentid:number){

   return this.http.get(url+"api/star/student/"+studentid,{headers:headers}); 
 }

 getStudentPercentageIncr(studentid:number)
{
   return this.http.get(url+"api/chart/inc/student/"+studentid,{headers:headers}); 
}
 //end region student

 //region group component
 getGroups(schoolid:number)
 {
   return this.http.get(url+"api/details/group/"+schoolid,{headers:headers});
 }

 getClassWiseDataForGroup(groupid:number)
 {
   return this.http.get(url+"api/details/classwisegroup/"+groupid,{headers:headers});
 }

 getStudentWiseDataForGroup(groupid:number, schoolid:number, classid:number)
 {
   return this.http.get(url+"api/details/studentwisegroup/"+groupid+"/"+schoolid+"/"+classid,{headers:headers});
 }

 getGroupDataForSchool(groupid:number)
 {
   return this.http.get(url+"api/chart/group/"+groupid,{headers:headers}); 
 }

 getGroupDataForClass(groupid:number, classid:number)
 {
   return this.http.get(url+"api/chart/group/"+groupid+"/"+classid,{headers:headers}); 
 }

 getStarDataFromSchool(groupid:number)
 {
   return this.http.get(url+"api/star/group/"+groupid,{headers:headers}); 
 }

 getStarDataFromClass(groupid:number,classid:number)
 {
   return this.http.get(url+"api/star/group/"+groupid+"/"+classid,{headers:headers}); 
 }

 getGroupForSchoolPercentageIncr(groupid:number)
{
   return this.http.get(url+"api/chart/inc/group/"+groupid,{headers:headers}); 
}

getGroupForClassPercentageIncr(groupid:number,classid:number)
{
   return this.http.get(url+"api/chart/inc/group/"+groupid+"/"+classid,{headers:headers}); 
}
 //end 

 //region role-management 
 getUserList(){

   return this.http.get(url+"api/roles/users",{headers:headers});
}

getRoleList(){

   return this.http.get(url+"api/roles/roles",{headers:headers});
}

getRoleListById(userid:number){

   return this.http.get(url+"api/roles/roles/"+userid,{headers:headers});
}

updateUserRole(formData:any)
{
   return this.http.post(url+"api/roles/save/",formData.value,{headers:headers});
}
//end role

//region upload

getPerformanceListByDate(schoolid:number,classid:number,date:string)
{
   return  this.http.get(url+"api/details/studentBydate/"+schoolid+"/"+classid+"/"+date,{headers:headers});
}

InsertManualData(performanceData:OutputData)
{
   return this.http.post(url+"api/details/save/"+performanceData.Attendance+"/"+
   performanceData.Discipline+"/"+performanceData.Homework+"/"+performanceData.ClassId
   +"/"+performanceData.SchoolId+"/"+performanceData.EntryDate,JSON.stringify(performanceData.StudentList) ,{headers:headers});
}
//end upload
}

