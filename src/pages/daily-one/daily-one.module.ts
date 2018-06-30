import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyOnePage } from './daily-one';

@NgModule({
  declarations: [
    DailyOnePage,
  ],
  imports: [
    IonicPageModule.forChild(DailyOnePage),
  ],
})
export class DailyOnePageModule {}
