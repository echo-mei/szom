import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyTenCreatePage } from './daily-ten-create';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DailyTenCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(DailyTenCreatePage),
    ComponentsModule
  ],
})
export class DailyTenCreatePageModule {}
