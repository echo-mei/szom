import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';

@IonicPage()
@Component({
  selector: 'page-daily-one',
  templateUrl: 'daily-one.html',
})
export class DailyOnePage {
  //每周一励
  dailyOneList: Array<object>;
  single:boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider) {
    this.getDailyOneList();
    this.getBeforePage();
  }
  ionViewDidLoad() {
  }
  //每周一励
  getDailyOneList() {
    this.dailyProvider.getDailyOneList({}).subscribe(
      (data) => {
        // data.reverse();
        console.log(data.reverse());
        console.log(data.length);
        this.dailyOneList = data;
      }
    );
  }
  getBeforePage(){
     console.log();
  }
  //跳转页面
  goDailyCreate() {
    this.navCtrl.push('DailyCreatePage',{ 'single': this.single }
    );
  }

  goDailyShow() {
    this.navCtrl.push('DailyShowPage', { 'single': this.single });
  }


}
