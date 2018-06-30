import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignDatePage } from './sign-date';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  declarations: [
    SignDatePage,
  ],
  imports: [
    IonicPageModule.forChild(SignDatePage),
    CalendarModule
  ],
})
export class SignDatePageModule {}
