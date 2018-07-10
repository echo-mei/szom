import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EvaluatePage } from './evaluate';
import { EvaluateListPageModule } from '../evaluate-list/evaluate-list.module';

@NgModule({
  declarations: [
    EvaluatePage,
  ],
  imports: [
    IonicPageModule.forChild(EvaluatePage),
    EvaluateListPageModule
  ],
  exports:[
    EvaluatePage
  ],
})
export class EvaluatePageModule {}
