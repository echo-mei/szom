import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddresslistPage } from './addresslist';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    AddresslistPage,
  ],
  imports: [
    IonicPageModule.forChild(AddresslistPage),
    IonicImageLoader
  ],
})
export class AddresslistPageModule {}
