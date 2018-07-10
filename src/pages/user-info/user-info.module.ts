import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInfoPage } from './user-info';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    UserInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(UserInfoPage),
    IonicImageLoader
  ],
})
export class UserInfoPageModule {}
