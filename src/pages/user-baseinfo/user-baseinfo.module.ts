import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserBaseinfoPage } from './user-baseinfo';

@NgModule({
  declarations: [
    UserBaseinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(UserBaseinfoPage),
  ],
})
export class UserBaseinfoPageModule {}
