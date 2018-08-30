import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, InfiniteScroll, LoadingController } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';
import { DailyMeShowPage } from '../daily-me-show/daily-me-show';

@Component({
  selector: 'page-daily-ten-search',
  templateUrl: 'daily-ten-search.html',
})
export class DailyTenSearchPage {
  @ViewChild('infinite') infinite: InfiniteScroll;
  @ViewChild('searchbar') searchbar;
  onUpdate: (daily) => {};
  onDelete: (dailyId) => {};
  user: any;
  size: number = 10;
  timeStarts: string = '';
  timeEnd: string = '';
  searchQuery: string = '';
  selectTimeShowFlag = false;
  showNotFound: boolean=false;
  //原数据
  dailyList: Array<object>;
   /*关键词*/
  selectString: string = '';
  onceLoad:number = 1;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public dateUtil: DateUtilProvider,
    public storage: StorageProvider,
    public loadingCtrl: LoadingController
  ) {
    this.user = this.navParams.get('user');
    this.onUpdate = this.navParams.get('onUpdate');
    this.onDelete = this.navParams.get('onDelete');
    this.dailyList = [];
    this.initLogDailyList();
  }

  initLogDailyList() {
    this.more(false);
  }
  //返回
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

  changeTime(params) {
    if(params['searchStart']){

      params['searchStart'] = `${params['searchStart']}-01-01`;
    }
    if(params['searchEnd']){

      params['searchEnd'] = `${params['searchEnd']}-12-31`;
    }
  }

  more(boolSearch=true, infinite?: InfiniteScroll) {
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
    this.changeTime(params)
    if (boolSearch && this.dailyList.length) {
      params['endTime'] = this.dailyList[this.dailyList.length - 1]['publishTime'];
    }
    this.onceLoad-->0?loading.present():'';
    this.dailyProvider.getDailyTenList(params).subscribe(
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
          boolSearch? this.dailyList = this.dailyList.concat(data.list): this.dailyList = data.list;
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
