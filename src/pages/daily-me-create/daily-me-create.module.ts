import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyMeCreatePage } from './daily-me-create';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    DailyMeCreatePage
  ],
  imports: [
    IonicPageModule.forChild(DailyMeCreatePage),
    ComponentsModule,
    DirectivesModule
  ],
})
export class DailyCreatePageModule {}
