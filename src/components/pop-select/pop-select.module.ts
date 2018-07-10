import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopSelectComponent } from './pop-select';

@NgModule({
  declarations: [
    PopSelectComponent,
  ],
  imports: [
    IonicPageModule.forChild(PopSelectComponent),
  ],
})
export class PopSelectModule {}
