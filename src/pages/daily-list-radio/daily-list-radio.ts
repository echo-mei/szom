import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';

@IonicPage()
@Component({
  selector: 'page-daily-list-radio',
  templateUrl: 'daily-list-radio.html',
})
export class DailyListRadioPage {

  @ViewChild('infinite') infinite: InfiniteScroll;

  size = 10;
  searchKeyword: string = '';
  logDataList: Array<object>;
  selectDaily: object;

  onDone: (daily) => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
  ) {
    this.onDone = this.navParams.get('onDone');
    this.initDailyList();
  }

  initDailyList() {
    this.logDataList = [];
    this.more();
  }

  more(infinite?: InfiniteScroll) {
    this.infinite && this.infinite.enable(true);
    let params = {
      size: this.size,
      searchKeyword: this.searchKeyword
    };
    if(this.logDataList.length) {
      params['endTime'] = this.logDataList[this.logDataList.length - 1]['publishTime'];
    }
    this.dailyProvider.getLogDailyList(params).subscribe(
      (data) => {
        infinite&&infinite.complete();
        if(data.length) {
          infinite && infinite.enable(true);
          this.logDataList = this.logDataList.concat(data);
        }else {
          infinite && infinite.enable(false);
        }
      }
    );
  }

  backCreateDaily(){
    this.navCtrl.pop();
    this.onDone && this.onDone(this.selectDaily);
  }

  changeRadio(index){
    this.selectDaily = this.logDataList[index];
  }
}
