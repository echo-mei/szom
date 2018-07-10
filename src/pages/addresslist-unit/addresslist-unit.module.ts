import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddresslistUnitPage } from './addresslist-unit';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    AddresslistUnitPage,
  ],
  imports: [
    IonicPageModule.forChild(AddresslistUnitPage),
    IonicImageLoader
  ],
})
export class AddresslistUnitPageModule {}
