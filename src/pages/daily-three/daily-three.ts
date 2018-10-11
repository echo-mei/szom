import { Component } from '@angular/core';
import { NavController, NavParams, InfiniteScroll, Events, LoadingController } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';
import { DailyThreeCreatePage } from '../daily-three-create/daily-three-create';
import { DailyThreeShowPage } from '../daily-three-show/daily-three-show';
import { DailyThreeSearchPage } from '../daily-three-search/daily-three-search';

@Component({
  selector: 'page-daily-three',
  templateUrl: 'daily-three.html',
})
export class DailyThreePage {

  canCreate: boolean;
  user: any;
  newFlag:any;
  size:number = 10;
  dailyThreeList: any[] = []; // 每季三励列表
  year: number;  // 当前年
  count:number; //每周日志数配置
  quarter: {
    index?: number,
    quarter?: {
      firstDate: Date,
      lastDate: Date
    }
  } = {};  // 当前季
  boolShow = {};
  dataLoadOver = false; //数据加载完成标志
  loading = this.loadingCtrl.create({
    content: '处理中...',
    // showBackdrop:false,
    cssClass: 'loading-new'
  });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public dateUtil: DateUtilProvider,
    public events: Events,
    public storage: StorageProvider,
    public loadingCtrl:LoadingController
  ) {
    this.user = this.navParams.get('user');
    this.newFlag = this.navParams.get('newFlag');
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
      size: this.size,
      userCode: this.user.userCode
    };
    if(this.dailyThreeList.length) {
      params['startTime'] = this.dailyThreeList[0]['publishTime'];
    }
    this.dailyProvider.getDailyThreeList(params).subscribe(
      (data) => {
        if(data.list.length) {
          for(let i = data.list.length-1; i >= 0; i--) {
            this.dailyThreeList.unshift(data.list[i]);
          }
        }
        this.resetCanCreate();
      }
    );
  }

  showTopTime(list) {
    for(var i=list.length-1; i>=0; i--){
      if((i-1<0?true: list[i].quarterNums != list[i-1].quarterNums)){
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
    if(this.dailyThreeList.length) {
      params['endTime'] = this.dailyThreeList[this.dailyThreeList.length-1].publishTime;
    }
    if (!infinite) {
      this.loading.present();
    }
    this.dailyProvider.getDailyThreeList(params).subscribe(
      (data) => {
        if (!infinite) {
          this.dataLoadOver = true;
          this.loading.dismiss();
        }
        this.count = data.count;
        infinite && infinite.complete();
        if(data.list.length) {
          infinite && infinite.enable(true);
          this.dailyThreeList = this.dailyThreeList.concat(data.list);
        }else {
          infinite && infinite.enable(false);
        }
        this.showTopTime(this.dailyThreeList);
        this.resetCanCreate();
      }
    );
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

  getCurrentIndex() {
    let index = 1;
    this.dailyThreeList.forEach((daily) => {
      if(daily.year==this.year&&daily.quarterNums==this.quarter.index) {
        index++;
      }
    });
    return index;
  }

  getIndex(log) {
    let index = 1;
    for(let i=this.dailyThreeList.length-1; i>=0; i--) {
      let daily = this.dailyThreeList[i];
      if(log==daily) {
        return index;
      }
      if(daily.year==log.year&&daily.quarterNums==log.quarterNums) {
        index++;
      }
    }
    return index;
  }

  resetCanCreate() {
    let count = 0;
    this.dailyThreeList.forEach((daily) => {
      if(daily.year==this.year&&daily.quarterNums==this.quarter.index) {
        count++;
      }
    });
    this.canCreate = count>=this.count ? false : true;
  }

  goDailyCreate() {
    this.navCtrl.push(DailyThreeCreatePage, {
      year: this.year,
      quarter: this.quarter,
      user: this.user,
      count: this.count,
      onCreate: this.initList.bind(this)
    });
  }

  goDailyShow(daily) {
    this.navCtrl.push(DailyThreeShowPage, {
      dailyThree: daily,
      count: this.count,
      onUpdate: this.initList.bind(this),
      onDelete: this.initList.bind(this)
    });
  }

  goDailySearch(){
    this.navCtrl.push(DailyThreeSearchPage,{
      user: this.user,
    });
  }

  dateFormat(date):string{
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month<10?month = '0' + month:month;
    let day = date.getDate();
    day<10?day = '0' + day:day;
    date = year + '.' + month + '.' +day;
    return date;
  }
}
