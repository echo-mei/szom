import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Events } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';

@IonicPage()
@Component({
  selector: 'page-daily-three',
  templateUrl: 'daily-three.html',
})
export class DailyThreePage {
  user: any;
  size:number = 10;
  dailyThreeList: any[] = []; // 每季三励列表
  year: number;  // 当前年
  quarter: {
    index?: number,
    quarter?: {
      firstDate: Date,
      lastDate: Date
    }
  } = {};  // 当前季

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
    this.quarter = this.dateUtil.getQuarterOfDay(date);
    this.initList();
  }

  initList() {
    this.dailyThreeList = [];
    this.more();
  }

  load() {
    let params = {
      size: this.size
    };
    if(this.dailyThreeList.length) {
      params['startTime'] = this.dailyThreeList[0]['publishTime'];
    }
    this.dailyProvider.getDailyThreeList(params).subscribe(
      (data) => {
        if(data.length) {
          for(let i = data.length-1; i >= 0; i--) {
            this.dailyThreeList.unshift(data[i]);
          }
        }
      }
    );
  }

  more(infinite?: InfiniteScroll) {
    let params = {size: this.size};
    if(this.dailyThreeList.length) {
      params['endTime'] = this.dailyThreeList[this.dailyThreeList.length-1].publishTime;
    }
    this.dailyProvider.getDailyThreeList(params).subscribe(
      (data) => {
        infinite && infinite.complete();
        if(data.length) {
          infinite && infinite.enable(true);
          this.dailyThreeList = this.dailyThreeList.concat(data);
        }else {
          infinite && infinite.enable(false);
        }
      }
    );
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

  getIndex(log) {
    let index = 0;
    for(let i=this.dailyThreeList.length-1; i>=0; i--) {
      let daily = this.dailyThreeList[i];
      if(daily.year==log.year) {
        index++;
      }
      if(log==daily) {
        return index;
      }
    }
  }

  getCurrentIndex() {
    let index = (this.quarter.index - 1) * 3 + 1;
    this.dailyThreeList.forEach((daily) => {
      if(daily.year==this.year&&daily.quarterNums==this.quarter.index) {
        index++;
      }
    });
    return index;
  }

  canCreate() {
    let count = 0;
    this.dailyThreeList.forEach((daily) => {
      if(daily.year==this.year&&daily.quarterNums==this.quarter.index) {
        count++;
      }
    });
    return count>=3 ? false : true;
  }

  goDailyCreate() {
    this.navCtrl.push('DailyThreeCreatePage', {
      year: this.year,
      quarter: this.quarter,
      onCreate: this.initList.bind(this)
    });
  }

  goDailyShow(daily) {
    this.navCtrl.push('DailyThreeShowPage', {
      dailyThree: daily,
      onUpdate: this.initList.bind(this),
      onDelete: this.initList.bind(this)
    });
  }

  goDailySearch(){
    this.navCtrl.push('DailyThreeSearchPage',{
      user: this.user,
    });
  }

}
