import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [  
    RouterModule,
    SharedModule
  ],
  declarations: [
  ],
  providers:[ DatePipe]
})

export class PocLayoutModule {}
