import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DynamicDetailPage } from './dynamic-detail';

@NgModule({
  declarations: [
    DynamicDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DynamicDetailPage),
  ],
})
export class DynamicDetailPageModule {}
