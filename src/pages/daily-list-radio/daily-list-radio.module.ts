import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyListRadioPage } from './daily-list-radio';

@NgModule({
  declarations: [
    DailyListRadioPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyListRadioPage),
  ],
})
export class DailyListRadioPageModule {}
