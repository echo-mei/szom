import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyMeSearchPage } from './daily-me-search';

@NgModule({
  declarations: [
    DailyMeSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyMeSearchPage),
  ],
})
export class DailyMeSearchPageModule {}
