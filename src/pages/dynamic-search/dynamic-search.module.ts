import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DynamicSearchPage } from './dynamic-search';

@NgModule({
  declarations: [
    DynamicSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(DynamicSearchPage),
  ],
})
export class DynamicSearchPageModule {}
