import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EvaluateProvider } from '../../providers/evaluate/evaluate';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
/**
 * Generated class for the EvaluteCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-evalute-create',
  templateUrl: 'evalute-create.html',
})
export class EvaluteCreatePage {
  evaluationId = 1;
  evaluationObjectCode:string = '';
  evaluationTitle:string = '';
  evaluationContent:string = '';
  publisher = 1;
  evaluteFrom:FormGroup;
  onCreate: () => {};
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public EvaluateProvider:EvaluateProvider,
     public formBuilder: FormBuilder,
    ) {
      this.onCreate = this.navParams.get('onCreate');
      this.evaluteFrom = formBuilder.group({
        //被评价人、来源、标题
        evaluationObject: ['', Validators.compose([Validators.required])],
        source: ['', Validators.compose([Validators.required])],
        title: ['', Validators.compose([Validators.required])]
      });

      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EvaluteCreatePage');
  }

  goEvaluteCreateSearch(){
    this.navCtrl.push("EvaluteCreateSearchPage");
  }

  postEvaluteCreate(){
    let params = {
      ...this.evaluteFrom.value
    };
    // let params = {
    //   evaluationId:this.evaluationId,
    //   evaluationObjectCode: this.evaluationObjectCode,
    //   evaluationTitle: this.evaluationTitle,
    //   evaluationContent: this.evaluationContent
    // }
    this.EvaluateProvider.createEvalute(params).subscribe(
      (data) => {
        this.evaluationId +=1;
        this.navCtrl.pop();
        this.onCreate && this.onCreate();
      }
    );
  }

}
