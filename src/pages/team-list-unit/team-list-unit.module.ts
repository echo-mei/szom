import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamListUnitPage } from './team-list-unit';

@NgModule({
  declarations: [
    TeamListUnitPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamListUnitPage),
  ],
})
export class TeamListUnitPageModule {}
