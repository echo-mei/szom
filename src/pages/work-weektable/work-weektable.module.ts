import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkWeektablePage } from './work-weektable';

@NgModule({
  declarations: [
    WorkWeektablePage,
  ],
  imports: [
    IonicPageModule.forChild(WorkWeektablePage),
  ],
})
export class WorkWeektablePageModule {}
