import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DynamicListPage } from './dynamic-list';

@NgModule({
  declarations: [
    DynamicListPage,
  ],
  imports: [
    IonicPageModule.forChild(DynamicListPage),
  ],
  exports: [
    DynamicListPage
  ]
})
export class DynamicListPageModule {}
