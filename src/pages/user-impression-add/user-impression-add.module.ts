import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserImpressionAddPage } from './user-impression-add';

@NgModule({
  declarations: [
    UserImpressionAddPage,
  ],
  imports: [
    IonicPageModule.forChild(UserImpressionAddPage),
  ],
})
export class UserImpressionAddPageModule {}
