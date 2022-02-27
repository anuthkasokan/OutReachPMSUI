import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { UploadComponent } from 'app/upload/upload.component';
import { SchoolComponent } from 'app/dashboard/school/school.component';
import { StudentComponent } from 'app/dashboard/student/student.component';
import { ClassComponent } from 'app/dashboard/class/class.component';
import { GroupComponent } from 'app/dashboard/group/group.component';
import { UploadSheetComponent } from 'app/upload/upload-sheet/upload-sheet.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTooltipModule, MatAutocompleteModule, MatSlideToggleModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { MatFileUploadModule } from 'angular-material-fileupload';

@NgModule({
  declarations: [
    DashboardComponent,
    UploadComponent,
    SchoolComponent,
    StudentComponent,
    ClassComponent,
    GroupComponent,
    UploadSheetComponent
  ],
  imports: [
  RouterModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatFileUploadModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatFileUploadModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
    DashboardComponent,
    UploadComponent,
    SchoolComponent,
    StudentComponent,
    ClassComponent,
    GroupComponent,
    UploadSheetComponent
  ],
  entryComponents: [UploadSheetComponent]

})
export class SharedModule { }
