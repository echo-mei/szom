import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, Events, InfiniteScroll } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { BASE_URL } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-daily-ten',
  templateUrl: 'daily-ten.html',
})
export class DailyTenPage {
  user: any;
  size:number = 10;
  dailyTenList: any[] = []; // 每年十励列表
  year:number;  // 当前年

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
    this.initList();
  }

  initList() {
    this.dailyTenList = [];
    this.more();
  }

  load() {
    let params = {
      size: this.size
    };
    if(this.dailyTenList.length) {
      params['startTime'] = this.dailyTenList[0]['publishTime'];
    }
    this.dailyProvider.getDailyTenList(params).subscribe(
      (data) => {
        if(data.length) {
          for(let i = data.length-1; i >= 0; i--) {
            this.dailyTenList.unshift(data[i]);
          }
        }
      }
    );
  }

  more(infinite?: InfiniteScroll) {
    let params = {size: this.size};
    if(this.dailyTenList.length) {
      params['endTime'] = this.dailyTenList[this.dailyTenList.length-1].publishTime;
    }
    this.dailyProvider.getDailyTenList(params).subscribe(
      (data) => {
        infinite && infinite.complete();
        if(data.length) {
          infinite && infinite.enable(true);
          this.dailyTenList = this.dailyTenList.concat(data);
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
    let count = 0;
    this.dailyTenList.forEach((daily) => {
      if(daily.year==this.year) {
        count++;
      }
    });
    return count>=10 ? false : true;
  }

  getCurrentIndex() {
    let index = 1;
    this.dailyTenList.forEach((daily) => {
      if(daily.year==this.year) {
        index++;
      }
    });
    return index;
  }

  getIndex(log) {
    let index = 0;
    for(let i=this.dailyTenList.length-1; i>=0; i--) {
      let daily = this.dailyTenList[i];
      if(daily.year==this.year) {
        index++;
      }
      if(log==daily) {
        return index;
      }
    }
  }

  goDailyCreate() {
    this.navCtrl.push('DailyTenCreatePage', {
      year: this.year,
      onCreate: this.initList.bind(this)
    });
  }

  goDailyShow(log) {
    this.navCtrl.push('DailyTenShowPage', {
      dailyTen: log,
      onDelete: this.initList.bind(this),
      onUpdate: this.initList.bind(this)
    });
  }

  goDailySearch(){
    this.navCtrl.push('DailyTenSearchPage',{
      user:this.user
    });
  }

}
