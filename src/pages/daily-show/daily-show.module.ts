import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyShowPage } from './daily-show';
import { DirectivesModule } from '../../directives/directives.module';
import { PopSelectComponent } from '../../components/pop-select/pop-select';

@NgModule({
  declarations: [
    DailyShowPage,
    PopSelectComponent
  ],
  imports: [
    IonicPageModule.forChild(DailyShowPage),
    DirectivesModule
  ],
  entryComponents: [
    PopSelectComponent
  ]
})
export class DailyShowPageModule {}
