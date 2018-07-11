import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDynamicShowPage } from './user-dynamic-show';

@NgModule({
  declarations: [
    UserDynamicShowPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDynamicShowPage),
  ],
})
export class UserDynamicShowPageModule {}
