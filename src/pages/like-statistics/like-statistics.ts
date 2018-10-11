import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the DailyLikelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-like-statistics',
  templateUrl: 'like-statistics.html',
})
export class LikeStatisticsPage {

  stlikeList: any;
  stlikeSum: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.stlikeList = this.navParams.get('stlikeList');
    this.stlikeSum = this.navParams.get('stlikeSum');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyLikelistPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
