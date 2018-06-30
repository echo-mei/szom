import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchConditionsPage } from './search-conditions';

@NgModule({
  declarations: [
    SearchConditionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchConditionsPage),
  ],
})
export class SearchConditionsPageModule {}
