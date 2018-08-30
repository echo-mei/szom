import { Component} from '@angular/core';
import { NavController, NavParams, Events, InfiniteScroll } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { BASE_URL } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';
import { DailyTenCreatePage } from '../daily-ten-create/daily-ten-create';
import { DailyTenShowPage } from '../daily-ten-show/daily-ten-show';
import { DailyTenSearchPage } from '../daily-ten-search/daily-ten-search';

@Component({
  selector: 'page-daily-ten',
  templateUrl: 'daily-ten.html',
})
export class DailyTenPage {
  canCreate: boolean;
  user: any;
  size:number = 10;
  dailyTenList: any[] = []; // 每年十励列表
  year:number;  // 当前年
  count:number; //每周日志数配置
  boolShow = {};

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
      size: this.size,
      userCode: this.user.userCode
    };
    if(this.dailyTenList.length) {
      params['startTime'] = this.dailyTenList[0]['publishTime'];
    }
    this.dailyProvider.getDailyTenList(params).subscribe(
      (data) => {
        if(data.list.length) {
          for(let i = data.list.length-1; i >= 0; i--) {
            this.dailyTenList.unshift(data.list[i]);
          }
        }
        this.resetCanCreate();
      }
    );
  }

  showTopTime(list) {
    for(var i=list.length-1; i>=0; i--){
      if((i-1<0?true: list[i].year != list[i-1].year)){
        this.boolShow[i] = true;
      }else{
        this.boolShow[i] = false;
      }
    }
  }

  more(infinite?: InfiniteScroll) {
    let params = {
      size: this.size,
      userCode: this.user.userCode
    };
    if(this.dailyTenList.length) {
      params['endTime'] = this.dailyTenList[this.dailyTenList.length-1].publishTime;
    }
    this.dailyProvider.getDailyTenList(params).subscribe(
      (data) => {
        this.count = data.count;
        infinite && infinite.complete();
        if(data.list.length) {
          infinite && infinite.enable(true);
          this.dailyTenList = this.dailyTenList.concat(data.list);
        }else {
          infinite && infinite.enable(false);
        }
        this.showTopTime(this.dailyTenList);
        this.resetCanCreate();
      }
    );
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

  resetCanCreate() {
    let count = 0;
    this.dailyTenList.forEach((daily) => {
      if(daily.year==this.year) {
        count++;
      }
    });
    this.canCreate = count>=this.count ? false : true;
  }

  getCurrentIndex() {
    let index = 1;
    this.dailyTenList.forEach((daily) => {
      index++;
    });
    return index;
  }

  getIndex(log) {
    let index = 1;
    for(let i=this.dailyTenList.length-1; i>=0; i--) {
      let daily = this.dailyTenList[i];
      if(log==daily) {
        return index;
      }
      index++;
    }
  }

  goDailyCreate() {
    this.navCtrl.push(DailyTenCreatePage, {
      year: this.year,
      user:this.user,
      count: this.count,
      onCreate: this.initList.bind(this)
    });
  }

  goDailyShow(log) {
    this.navCtrl.push(DailyTenShowPage, {
      dailyTen: log,
      count: this.count,
      onDelete: this.initList.bind(this),
      onUpdate: this.initList.bind(this)
    });
  }

  goDailySearch(){
    this.navCtrl.push(DailyTenSearchPage,{
      user:this.user
    });
  }

}
