import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddresslistMinePage } from './addresslist-mine';
import { DragulaModule } from 'ng2-dragula';


@NgModule({
  declarations: [
    AddresslistMinePage,
  ],
  imports: [
    IonicPageModule.forChild(AddresslistMinePage),
    DragulaModule
  ],
})
export class AddresslistMinePageModule {}
