import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyMePage } from './daily-me';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    DailyMePage,
  ],
  imports: [
    IonicPageModule.forChild(DailyMePage),
    IonicImageLoader
  ],
})
export class DailyMePageModule {}
