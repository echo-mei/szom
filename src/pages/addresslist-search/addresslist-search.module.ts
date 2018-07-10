import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddresslistSearchPage } from './addresslist-search';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    AddresslistSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(AddresslistSearchPage),
    IonicImageLoader
  ],
})
export class AddresslistSearchPageModule {}
