import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailySearchPage } from './daily-search';

@NgModule({
  declarations: [
    DailySearchPage,
  ],
  imports: [
    IonicPageModule.forChild(DailySearchPage),
  ],
})
export class DailySearchPageModule {}
