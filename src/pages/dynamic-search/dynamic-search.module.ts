import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DynamicSearchPage } from './dynamic-search';
import { CalendarModule } from "ion2-calendar";

@NgModule({
  declarations: [
    DynamicSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(DynamicSearchPage),
    CalendarModule
  ],
})
export class DynamicSearchPageModule {}
