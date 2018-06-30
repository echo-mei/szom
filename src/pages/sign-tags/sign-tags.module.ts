import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignTagsPage } from './sign-tags';

@NgModule({
  declarations: [
    SignTagsPage,
  ],
  imports: [
    IonicPageModule.forChild(SignTagsPage),
  ],
})
export class SignTagsPageModule {}
