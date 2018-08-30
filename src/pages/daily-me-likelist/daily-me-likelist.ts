import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DailyLikelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-daily-me-likelist',
  templateUrl: 'daily-me-likelist.html',
})
export class DailyMeLikelistPage {

  stlikeList: any;
  stlikeSum: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.stlikeList = this.navParams.get('stlikeList');
    this.stlikeSum = this.navParams.get('stlikeSum');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyLikelistPage');
  }

}
