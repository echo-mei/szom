import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-me-help-feedback-detail',
  templateUrl: 'me-help-feedback-detail.html',
})
export class MeHelpFeedbackDetailPage {

  item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeHelpFeedbackDetailPage');
  }

}
