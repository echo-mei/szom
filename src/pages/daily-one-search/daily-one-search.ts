import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { TimeSelectComponent } from '../../components/time-select/time-select';
import { DailyProvider } from '../../providers/daily/daily';

@IonicPage()
@Component({
  selector: 'page-daily-one-search',
  templateUrl: 'daily-one-search.html',
})
export class DailyOneSearchPage {

  @ViewChild('timeSelect') timeSelect: TimeSelectComponent;

  key:string;
  size:number = 10;
  dailyOneList: any[] = []; // 每周一励列表

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider
  ) {
    this.initList();
  }

  goBack() {
    this.navCtrl.pop();
  }

  initList() {
    this.dailyOneList = [];
    this.more();
  }

  searchList() {
    this.dailyOneList = [];
    this.more();
  }

  more(infinite?: InfiniteScroll) {
    let params = {size: this.size};
    if(this.dailyOneList.length) {
      params['endTime'] = this.dailyOneList[this.dailyOneList.length-1].publishTime;
    }
    if(this.key) {
      params['searchKeyword'] = this.key;
    }
    if(this.timeSelect) {
      let startTime = this.timeSelect.startTime;
      let endTime = this.timeSelect.endTime;
      if(startTime) {
        params['searchStart'] = startTime;
      }else if(endTime) {
        params['searchEnd'] = endTime;
      }
    }
    this.dailyProvider.getDailyOneList(params).subscribe(
      (data) => {
        infinite && infinite.complete();
        if(data.length) {
          infinite && infinite.enable(true);
          this.dailyOneList = this.dailyOneList.concat(data);
        }else {
          infinite && infinite.enable(false);
        }
      }
    );
  }

  goDailyShow(one) {
    this.navCtrl.push('DailyOneShowPage', {
      dailyOne: one,
      onDelete: this.initList.bind(this),
      onUpdate: this.initList.bind(this)
    });
  }

}
