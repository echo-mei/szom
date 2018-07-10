import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyThreeUpdatePage } from './daily-three-update';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DailyThreeUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(DailyThreeUpdatePage),
    ComponentsModule
  ],
})
export class DailyThreeUpdatePageModule {}
