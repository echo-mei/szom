import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';

/**
 * Generated class for the DailyListRadioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daily-list-radio',
  templateUrl: 'daily-list-radio.html',
})
export class DailyListRadioPage {

  logDataList: Array<object>;
  selectDaily: object;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public DailyProvider: DailyProvider,
  ) {
    this.getLogDailyList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyListRadioPage');
  }

  getLogDailyList() {
    this.DailyProvider.getLogDailyList(null).subscribe(
      (data) => {
        this.logDataList = data;
      }
    );
  }

  backCreateDaily(){
    var dailyContent = this.navParams.get('callback');
    dailyContent(this.selectDaily).then(()=>{
      this.navCtrl.pop();
    });
  }

  changeRadio(index){
    this.selectDaily = this.logDataList[index];
  }
}
