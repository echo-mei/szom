import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyMeShowPage } from './daily-me-show';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    DailyMeShowPage
  ],
  imports: [
    IonicPageModule.forChild(DailyMeShowPage),
    ComponentsModule,
    DirectivesModule
  ]
})
export class DailyShowPageModule {}
