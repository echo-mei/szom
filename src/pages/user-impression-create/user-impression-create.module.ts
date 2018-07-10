import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserImpressionCreatePage } from './user-impression-create';

@NgModule({
  declarations: [
    UserImpressionCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(UserImpressionCreatePage),
  ],
})
export class UserImpressionCreatePageModule {}
