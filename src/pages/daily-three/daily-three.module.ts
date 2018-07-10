import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyThreePage } from './daily-three';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    DailyThreePage,
  ],
  imports: [
    IonicPageModule.forChild(DailyThreePage),
    IonicImageLoader
  ],
})
export class DailyThreePageModule {}
