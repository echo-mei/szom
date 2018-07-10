import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyThreeShowPage } from './daily-three-show';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DailyThreeShowPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyThreeShowPage),
    ComponentsModule
  ],
})
export class DailyThreeShowPageModule {}
