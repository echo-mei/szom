import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyUpdatePage } from './daily-update';
import { DirectivesModule } from '../../directives/directives.module';
import { ImagePickerModule } from '../../components/image-picker/image-picker.module';

@NgModule({
  declarations: [
    DailyUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(DailyUpdatePage),
    DirectivesModule,
    ImagePickerModule
  ],
})
export class DailyUpdatePageModule {}
