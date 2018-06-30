import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyThreePage } from './daily-three';

@NgModule({
  declarations: [
    DailyThreePage,
  ],
  imports: [
    IonicPageModule.forChild(DailyThreePage),
  ],
})
export class DailyThreePageModule {}
