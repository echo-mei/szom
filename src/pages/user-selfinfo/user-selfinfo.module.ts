import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSelfinfoPage } from './user-selfinfo';

@NgModule({
  declarations: [
    UserSelfinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(UserSelfinfoPage),
  ],
})
export class UserSelfinfoPageModule {}
