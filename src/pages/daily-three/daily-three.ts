import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';

/**
 * Generated class for the DailyThreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daily-three',
  templateUrl: 'daily-three.html',
})
export class DailyThreePage {
  dailyThreeList: Array<object>;
  single:boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider) {
    this.getDailyThreeList();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyThreePage');
  }
  getDailyThreeList() {
    this.dailyProvider.getDailyThreeList({}).subscribe(
      (data) => {
        console.log(data.reverse());
        console.log(data.length);
        this.dailyThreeList = data;
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
