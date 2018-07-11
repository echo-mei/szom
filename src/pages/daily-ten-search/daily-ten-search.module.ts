import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyTenSearchPage } from './daily-ten-search';

@NgModule({
  declarations: [
    DailyTenSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyTenSearchPage),
  ],
})
export class DailyTenSearchPageModule {}
