import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyTenUpdatePage } from './daily-ten-update';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DailyTenUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(DailyTenUpdatePage),
    ComponentsModule
  ],
})
export class DailyTenUpdatePageModule {}
