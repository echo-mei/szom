import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyCreatePage } from './daily-create';

import { ImagePickerModule } from '../../components/image-picker/image-picker.module';


@NgModule({
  declarations: [
    DailyCreatePage,
    
  ],
  imports: [
    IonicPageModule.forChild(DailyCreatePage),
    ImagePickerModule
  ],
})
export class DailyCreatePageModule {}
