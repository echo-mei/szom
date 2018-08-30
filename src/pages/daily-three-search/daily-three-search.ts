import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, InfiniteScroll, LoadingController } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { BASE_URL } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';
import { DailyMeShowPage } from '../daily-me-show/daily-me-show';

@Component({
  selector: 'page-daily-three-search',
  templateUrl: 'daily-three-search.html',
})
export class DailyThreeSearchPage {
  @ViewChild('infinite') infinite: InfiniteScroll;
  @ViewChild('searchbar') searchbar;
  onUpdate: (daily) => {};
  onDelete: (dailyId) => {};
  user: any;
  size: number = 10;
  timeStarts: string = "";
  timeEnd: string = "";
  searchQuery: string = '';
  // keywords = '';  /*关键词*/
  selectTimeShowFlag = false;
  showNotFound: boolean = false;

  //原数据
  dailyList: Array<object>;
  selectString: string = '';

  //
  simpleColumns = [
    {
      name: 'col1',
      options: []
    },{
      name: 'col2',
      options: []
    }
  ];
  allYear = [];
  allJidu = [];
  onceLoad:number = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public dateUtil: DateUtilProvider,
    public storage: StorageProvider,
    public loadingCtrl: LoadingController
  ) {
    this.getYearAndJidu();
    this.user = this.navParams.get('user');
    this.onUpdate = this.navParams.get('onUpdate');
    this.onDelete = this.navParams.get('onDelete');
    this.dailyList = [];
    this.initLogDailyList();
  }

  initLogDailyList() {
    this.more(false);
  }

  getYearAndJidu() {
    for(var i=2018; i>2009; i--){
      var obj1 = {
        text: `${i}`,
        value: i
      }
      var k = 5;
      if(i == 2010){
        k = 6;
      }
      this.simpleColumns[0].options.push(obj1);
      for(var j=1; j<k; j++){
        var obj2 = {
          text: `第${j}季`,
          value: `第${j}季`,
          parentVal: i
        };
        this.simpleColumns[1].options.push(obj2);
      }
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

  // 重置
  reset() {
    this.timeStarts = '';
    this.timeEnd = '';
    this.selectTimeShowFlag = true;
  }

  updateDaily(daily) {
    for (let i = 0; i < this.dailyList.length; i++) {
      if (this.dailyList[i]['dailyId'] === daily.dailyId) {
        this.dailyList[i] = daily;
        return;
      }
    }
  }

  deleteDaily(dailyId) {
    for (let i = 0; i < this.dailyList.length; i++) {
      if (this.dailyList[i]['dailyId'] === dailyId) {
        this.dailyList.splice(i,1);
        return;
      }
    }
  }

  // 跳转详情页面
  goDailyShow(daily) {
    this.navCtrl.push(DailyMeShowPage, {
      daily: daily,
      onSearchUpdate: this.updateDaily.bind(this),
      onSearchDelete: this.deleteDaily.bind(this),
      onUpdate: this.onUpdate,
      onDelete: this.onDelete
    });
  }

  // 搜索确定按钮实现
  goSelcet(event: any) {
    this.selectTimeShowFlag = false;
    this.initLogDailyList();
  }

  // 将季转换为日期
  changeToDate(params) {
    var n = this.timeStarts.match(/[0-9]+/);
    var m = this.timeEnd.match(/[0-9]+/);
    switch(this.timeStarts){
      case `${n} 第1季`:params['searchStart'] = `${n}-01-01`; break;
      case `${n} 第2季`:params['searchStart'] = `${n}-04-01`; break;
      case `${n} 第3季`:params['searchStart'] = `${n}-07-01`; break;
      case `${n} 第4季`:params['searchStart'] = `${n}-10-01`; break;
    }
    switch(this.timeEnd){
      case `${m} 第1季`:params['searchEnd'] = `${m}-03-31`; break;
      case `${m} 第2季`:params['searchEnd'] = `${m}-06-30`; break;
      case `${m} 第3季`:params['searchEnd'] = `${m}-09-30`; break;
      case `${m} 第4季`:params['searchEnd'] = `${m}-12-31`; break;
    }
  }

  more(boolSearch = true, infinite?: InfiniteScroll) {
    let loading = this.loadingCtrl.create({
      content: '处理中...'
    });
    this.infinite && this.infinite.enable(true);
    let params = {
      size: this.size,
      userCode: this.user.userCode,
      searchKeyword: this.selectString,
      searchStart: this.timeStarts,
      searchEnd: this.timeEnd
    };
    this.changeToDate(params);

    if (boolSearch && this.dailyList.length) {
      params['endTime'] = this.dailyList[this.dailyList.length - 1]['publishTime'];
    }
    this.onceLoad-->0?loading.present():'';
    this.dailyProvider.getDailyThreeList(params).subscribe(
      (data) => {
        if(!boolSearch && !(this.dailyList == data.list && !data.list)){
          loading.present();
        };
        if(!data.list){
          this.showNotFound = true;
        };
        loading.dismiss();
        infinite && infinite.complete();
        if(!params['endTime'] && data.list == ''){
          this.dailyList = [];
        }
        if (data.list.length) {
          infinite && infinite.enable(true);
          boolSearch? this.dailyList = this.dailyList.concat(data): this.dailyList = data.list;
        } else {
          infinite && infinite.enable(false);
        }
      }
    );

  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

}
