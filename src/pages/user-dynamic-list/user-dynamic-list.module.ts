import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDynamicListPage } from './user-dynamic-list';

@NgModule({
  declarations: [
    UserDynamicListPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDynamicListPage),
  ],
})
export class UserDynamicListPageModule {}
