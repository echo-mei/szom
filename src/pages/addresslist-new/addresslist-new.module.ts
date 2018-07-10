import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddresslistNewPage } from './addresslist-new';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    AddresslistNewPage,
  ],
  imports: [
    IonicPageModule.forChild(AddresslistNewPage),
    IonicImageLoader
  ],
})
export class AddresslistNewPageModule {}
