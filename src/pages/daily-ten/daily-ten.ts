import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';


/**
 * Generated class for the DailyTenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daily-ten',
  templateUrl: 'daily-ten.html',
})
export class DailyTenPage {
  dailyTenList: Array<object>;
  single:boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider) {
      this.getDailyTenList();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyTenPage');
  }
  //每年十励
  getDailyTenList() {
    this.dailyProvider.getDailyTenList({}).subscribe(
      (data) => {
        // data.reverse();
        console.log(data.reverse());
        console.log(data.length);
        this.dailyTenList = data;
      }
    );
  }

  goDailyCreate() {
    this.navCtrl.push('DailyCreatePage', { 'single': this.single });
  }

  goDailyShow() {
    this.navCtrl.push('DailyShowPage', { 'single': this.single });
  }
}
