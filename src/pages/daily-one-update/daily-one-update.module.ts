import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyOneUpdatePage } from './daily-one-update';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DailyOneUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(DailyOneUpdatePage),
    ComponentsModule
  ],
})
export class DailyOneUpdatePageModule {}
