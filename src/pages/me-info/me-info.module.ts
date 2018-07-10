import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeInfoPage } from './me-info';
import { IonicImageLoader } from 'ionic-image-loader';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MeInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MeInfoPage),
    IonicImageLoader,
    ComponentsModule
  ],
})
export class MeInfoPageModule {}
