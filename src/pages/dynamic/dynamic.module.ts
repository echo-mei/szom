import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DynamicPage } from './dynamic';
import { DynamicListPageModule } from '../dynamic-list/dynamic-list.module';

@NgModule({
  declarations: [
    DynamicPage
  ],
  imports: [
    IonicPageModule.forChild(DynamicPage),
    DynamicListPageModule
  ]
})
export class DynamicPageModule {}
