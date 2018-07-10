import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserImpressionPage } from './user-impression';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UserImpressionPage,
  ],
  imports: [
    IonicPageModule.forChild(UserImpressionPage),
    ComponentsModule
  ],
})
export class UserImpressionPageModule {}
