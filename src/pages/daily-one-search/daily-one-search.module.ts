import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyOneSearchPage } from './daily-one-search';
import { ComponentsModule } from '../../components/components.module';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    DailyOneSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyOneSearchPage),
    ComponentsModule,
    IonicImageLoader
  ],
})
export class DailyOneSearchPageModule {}
