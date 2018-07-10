import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyMeUpdatePage } from './daily-me-update';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    DailyMeUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(DailyMeUpdatePage),
    ComponentsModule,
    DirectivesModule
  ],
})
export class DailyUpdatePageModule {}
