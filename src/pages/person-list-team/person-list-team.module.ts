import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonListTeamPage } from './person-list-team';

@NgModule({
  declarations: [
    PersonListTeamPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonListTeamPage),
  ],
})
export class PersonListTeamPageModule {}
