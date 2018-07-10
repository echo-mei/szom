import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyOnePage } from './daily-one';
import { IonicImageLoader } from 'ionic-image-loader';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DailyOnePage,
  ],
  imports: [
    IonicPageModule.forChild(DailyOnePage),
    IonicImageLoader,
    ComponentsModule
  ],
})
export class DailyOnePageModule {}
