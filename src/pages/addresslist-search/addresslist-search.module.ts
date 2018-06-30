import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddresslistSearchPage } from './addresslist-search';

@NgModule({
  declarations: [
    AddresslistSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(AddresslistSearchPage),
  ],
})
export class AddresslistSearchPageModule {}
