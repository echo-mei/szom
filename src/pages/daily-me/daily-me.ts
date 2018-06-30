import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';


@IonicPage()
@Component({
  selector: 'page-daily-me',
  templateUrl: 'daily-me.html',
})
export class DailyMePage {
  logDataList: Array<object>;
  stlikeList: Array<object>;
  stlikeSum:number = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public DailyProvider: DailyProvider) {
    this.getfindSTLike();
    this.getLogDailyList();
  }

  ionViewDidLoad() {

  }

  getLogDailyList() {
    this.DailyProvider.getLogDailyList({}).subscribe(
      (data) => {
        this.logDataList = data;
      }
    );
  }

  getfindSTLike(){
    this.DailyProvider.getfindSTLike({}).subscribe(
      (data) => {
        let that = this;
        this.stlikeList = data;
        this.stlikeList.forEach((val) => {
          that.stlikeSum += val["likeCounts"];
        })
      }
    )
  }

  goDailyShow() {
    this.navCtrl.push('DailyShowPage');
  }

  goDailyCreate() {
    this.navCtrl.push('DailyCreatePage');
  }

  goDailySearch(){
    this.navCtrl.push('SearchConditionsPage');
  }

}
