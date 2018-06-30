import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeSignPage } from './me-sign';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  declarations: [
    MeSignPage,
  ],
  imports: [
    IonicPageModule.forChild(MeSignPage),
    CalendarModule
  ],
})
export class MeSignPageModule {}
