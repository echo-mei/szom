import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, Events, InfiniteScroll } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';

@IonicPage()
@Component({
  selector: 'page-daily-one',
  templateUrl: 'daily-one.html',
})
export class DailyOnePage {
  user: any;
  size:number = 10;
  dailyOneList: any[] = []; // 每周一励列表
  year:number;  // 当前年
  week:{
    index?: number,
    week?: {
      firstDate: Date,
      lastDate: Date
    }
  } = {};  // 当前周

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public dateUtil: DateUtilProvider,
    public events: Events,
    public storage: StorageProvider
  ) {
    this.user = this.navParams.get('user');
    let date = new Date();
    this.year = date.getFullYear();
    this.week = this.dateUtil.getWeekOfDay(date);
    this.initList();
  }

  initList() {
    this.dailyOneList = [];
    this.more();
  }

  load() {
    let params = {
      size: this.size
    };
    if(this.dailyOneList.length) {
      params['startTime'] = this.dailyOneList[0]['publishTime'];
    }
    this.dailyProvider.getDailyOneList(params).subscribe(
      (data) => {
        if(data.length) {
          for(let i = data.length-1; i >= 0; i--) {
            this.dailyOneList.unshift(data[i]);
          }
        }
      }
    );
  }

  more(infinite?: InfiniteScroll) {
    let params = {size: this.size};
    if(this.dailyOneList.length) {
      params['endTime'] = this.dailyOneList[this.dailyOneList.length-1].publishTime;
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

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

  canCreate() {
    return this.dailyOneList.find((one) => {
      return one.weekNums == this.week.index;
    }) ? false : true;
  }

  goDailyCreate() {
    this.navCtrl.push('DailyOneCreatePage', {
      year: this.year,
      week: this.week,
      onCreate: this.initList.bind(this)
    });
  }

  goDailyShow(one) {
    this.navCtrl.push('DailyOneShowPage', {
      dailyOne: one,
      onDelete: this.initList.bind(this),
      onUpdate: this.initList.bind(this)
    });
  }

  goDailySearch(){
    this.navCtrl.push('DailyOneSearchPage',{
      user: this.user,
    });
  }

}
