import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddresslistNewPage } from './addresslist-new';

@NgModule({
  declarations: [
    AddresslistNewPage,
  ],
  imports: [
    IonicPageModule.forChild(AddresslistNewPage),
  ],
})
export class AddresslistNewPageModule {}
