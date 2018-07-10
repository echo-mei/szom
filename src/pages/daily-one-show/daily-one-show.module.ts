import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyOneShowPage } from './daily-one-show';

@NgModule({
  declarations: [
    DailyOneShowPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyOneShowPage),
  ],
})
export class DailyOneShowPageModule {}
