import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamListPage } from './team-list';

@NgModule({
  declarations: [
    TeamListPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamListPage),
  ],
})
export class TeamListPageModule {}
