import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { TimeSelectComponent } from './time-select';

@NgModule({
  declarations: [
    TimeSelectComponent,
  ],
  imports: [
    IonicModule
  ],
  exports: [
    TimeSelectComponent
  ]
})
export class PopSelectModule {}
