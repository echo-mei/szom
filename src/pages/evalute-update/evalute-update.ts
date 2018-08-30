import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EvaluateProvider } from '../../providers/evaluate/evaluate';

/**
 * Generated class for the EvaluteUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-evalute-update',
  templateUrl: 'evalute-update.html',
})
export class EvaluteUpdatePage {
  evaluationTitle:string = '';
  evaluationContent:string = '';
  publisher = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams,public EvaluateProvider:EvaluateProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EvaluteUpdatePage');
  }

  postEvaluteCreate(){
    let params = {
      evaluationTitle: this.evaluationTitle,
      evaluationContent: this.evaluationContent
    }
    this.EvaluateProvider.updateEvalute(params).subscribe(
      (data) => {
        this.navCtrl.pop();
      }
    );
  }
}
