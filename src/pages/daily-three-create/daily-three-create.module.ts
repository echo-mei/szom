import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyThreeCreatePage } from './daily-three-create';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DailyThreeCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(DailyThreeCreatePage),
    ComponentsModule
  ],
})
export class DailyThreeCreatePageModule {}
