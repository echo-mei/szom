import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams, Events, InfiniteScroll, LoadingController } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';
import { DailyOneCreatePage } from '../daily-one-create/daily-one-create';
import { DailyOneSearchPage } from '../daily-one-search/daily-one-search';
import { DailyOneShowPage } from '../daily-one-show/daily-one-show';

@Component({
  selector: 'page-daily-one',
  templateUrl: 'daily-one.html',
})
export class DailyOnePage {
  canCreate: boolean;
  user: any;
  newFlag:any;
  size:number = 10;
  dailyOneList: any[] = []; // 每周一励列表
  year:number;  // 当前年
  count:number; //每周日志数配置
  noInShow: boolean = true;
  week:{
    index?: number,
    week?: {
      firstDate: Date,
      lastDate: Date
    }
  } = {};  // 当前周
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
    this.week = this.dateUtil.getWeekOfDay(date);
    this.initList();
  }

  initList() {
    this.dailyOneList = [];
    this.more();
  }

  showTopTime(list) {
    for(var i=list.length-1; i>=0; i--){
      if((i-1<0?true: list[i].weekNums != list[i-1].weekNums)){
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
    if(this.dailyOneList.length) {
      params['endTime'] = this.dailyOneList[this.dailyOneList.length-1].publishTime;
    }
    if (!infinite) {
      this.loading.present();
    }
    this.dailyProvider.getDailyOneList(params).subscribe(
      (data) => {
        if (!infinite) {
          this.dataLoadOver = true;
          this.loading.dismiss();
        }
        this.count = data.count;
        infinite && infinite.complete();
        if(data.list.length) {
          infinite && infinite.enable(true);
          this.dailyOneList = this.dailyOneList.concat(data.list);
        }else {
          infinite && infinite.enable(false);
        }
        this.showTopTime(this.dailyOneList);
        this.resetCanCreate();
      }
    );
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

  resetCanCreate() {
    let count = 0;
    this.dailyOneList.forEach((daily) => {
      if(daily.year == this.year && daily.weekNums == this.week.index) {
        count++;
      }
    })
    this.canCreate = count>=this.count ? false : true;
  }

  goDailyCreate() {
    this.navCtrl.push(DailyOneCreatePage, {
      year: this.year,
      week: this.week,
      user: this.user,
      count: this.count,
      onCreate: this.initList.bind(this)
    });
  }

  goDailyShow(one) {
    this.navCtrl.push(DailyOneShowPage, {
      dailyOne: one,
      count: this.count,
      onDelete: this.initList.bind(this),
      onUpdate: this.initList.bind(this)
    });
  }

  goDailySearch(){
    this.navCtrl.push(DailyOneSearchPage,{
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
