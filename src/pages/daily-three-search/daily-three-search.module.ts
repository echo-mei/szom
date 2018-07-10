import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyThreeSearchPage } from './daily-three-search';

@NgModule({
  declarations: [
    DailyThreeSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyThreeSearchPage),
  ],
})
export class DailyThreeSearchPageModule {}
