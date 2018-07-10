import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyTenShowPage } from './daily-ten-show';

@NgModule({
  declarations: [
    DailyTenShowPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyTenShowPage),
  ],
})
export class DailyTenShowPageModule {}
