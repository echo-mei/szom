import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyOneCreatePage } from './daily-one-create';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DailyOneCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(DailyOneCreatePage),
    ComponentsModule
  ],
})
export class DailyOneCreatePageModule {}
