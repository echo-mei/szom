import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyTenPage } from './daily-ten';

@NgModule({
  declarations: [
    DailyTenPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyTenPage),
  ],
})
export class DailyTenPageModule {}
