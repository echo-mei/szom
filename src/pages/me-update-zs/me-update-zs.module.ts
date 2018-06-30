import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeUpdateZsPage } from './me-update-zs';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    MeUpdateZsPage
  ],
  imports: [
    IonicPageModule.forChild(MeUpdateZsPage),
    DirectivesModule
  ],
})
export class MeUpdateZsPageModule {}
