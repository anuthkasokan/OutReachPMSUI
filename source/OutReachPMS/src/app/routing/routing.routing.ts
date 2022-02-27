import { Routes } from '@angular/router';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { CityComponent } from 'app/dashboard/city/city.component';
import { SchoolComponent } from 'app/dashboard/school/school.component';
import { ClassComponent } from 'app/dashboard/class/class.component';
import { StudentComponent } from 'app/dashboard/student/student.component';
import { GroupComponent } from 'app/dashboard/group/group.component';
import { RoleAssignmentComponent } from 'app/role-assignment/role-assignment.component';
import { UploadComponent } from 'app/upload/upload.component';

 const AdminLayoutRoutes: Routes = [
 
    { path: 'dashboard',  component: DashboardComponent ,children:[
        { path: 'city',   component: CityComponent },
        { path: 'city/:id',   component: CityComponent },
        { path: 'school/:id/:cityid',   component: SchoolComponent },
        { path: 'school/null/null',     redirectTo:'/dashboard/city'},
        { path: 'class/:id/:schoolid/:cityid',   component: ClassComponent },
        { path: 'student/:id/:classid/:schoolid/:cityid',   component: StudentComponent},
        { path: 'group/:id/:schoolid/:cityid',   component: GroupComponent },
        { path: 'group/:id/:classid/:schoolid/:cityid',   component: GroupComponent },
    ]},
    { path: 'assignrole',   component: RoleAssignmentComponent },
    { path: 'upload',     component: UploadComponent },
    { path: '**',     redirectTo:'/dashboard/city'}
  
];

const PocLayoutRoutes: Routes = [
    { path: 'dashboard',  component: DashboardComponent ,children:[
    { path: 'school/:id/:cityid',   component: SchoolComponent },
    { path: 'school/'+localStorage.getItem('schoolid')+"/"+localStorage.getItem('cityid'),   component: SchoolComponent },
    { path: 'class/:id/:schoolid/:cityid',   component: ClassComponent },
    { path: 'student/:id/:classid/:schoolid/:cityid',   component: StudentComponent},
    { path: 'group/:id/:schoolid/:cityid',   component: GroupComponent },
    { path: 'group/:id/:classid/:schoolid/:cityid',   component: GroupComponent },
    ]},
    { path: 'upload',     component: UploadComponent },
    { path: '**',     redirectTo:'/dashboard/school/'+localStorage.getItem('schoolid')+"/"+localStorage.getItem('cityid')}
 ];

 export const ChildRoutes:Routes=  localStorage.getItem('schoolid').toString() =='null' ? AdminLayoutRoutes: PocLayoutRoutes ;