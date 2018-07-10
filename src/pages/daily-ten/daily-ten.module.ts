import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyTenPage } from './daily-ten';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    DailyTenPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyTenPage),
    IonicImageLoader
  ],
})
export class DailyTenPageModule {}
