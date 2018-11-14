import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { BASE_URL } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';
import { DailyThreeShowPage } from '../daily-three-show/daily-three-show';

@Component({
  selector: 'page-daily-three-search',
  templateUrl: 'daily-three-search.html',
})
export class DailyThreeSearchPage {

  onUpdate: (daily) => {};
  onDelete: (dailyId) => {};

  // 用户
  user: any;

  // 搜索关键词
  selectString: string = "";
  // 每页显示条数
  size: number = 10;
  // 开始时间
  timeStarts: string = "";
  // 结束时间
  timeEnd: string = "";
  // 列表
  dailyList: any[] = [];
  // 展示搜索区域
  selectTimeShowFlag = false;
  // 是否正在加载数据
  isLoading = false;
  // 是否还有更多数据
  hasMore: boolean = true;
  // 服务器年份
  year:any;
  // 时间选择器
  simpleColumns: object = [
    {
      name: 'col1',
      options: []
    },{
      name: 'col2',
      options: []
    }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public dateUtil: DateUtilProvider,
    public storage: StorageProvider,
  ) {
    this.onUpdate = this.navParams.get('onUpdate');
    this.onDelete = this.navParams.get('onDelete');
    this.user = this.navParams.get('user');
    this.year = this.navParams.get('year');
    this.getYearAndJidu();
    this.resetList();
  }

  // =================== Public Method =========================

  // 获取日期控件值
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

  // 重置列表
  resetList() {
    this.isLoading = true;
    this.dailyList = [];
    this._getLogDailyList().subscribe((data) => {
      data && data.list && (this.dailyList = data.list);
    });
  }

  // 获取列表数据
  _getLogDailyList(params?) {
    params = {
      size: this.size,
      userCode: this.user.userCode,
      searchKeyword: this.selectString,
      searchStart: this.timeStarts,
      searchEnd: this.timeEnd,
      ...params
    };
    if(params['searchStart'] || params['searchEnd']){
      this.changeToDate(params);
    }
    return this.dailyProvider.getDailyThreeList(params).do(
      data => {
        this.hasMore = data.list.length ? true : false;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  // 搜索条件格式转换
  changeToDate(params) {
    var n = this.timeStarts.match(/[0-9]+/);
    var m = this.timeEnd.match(/[0-9]+/);
    switch(this.timeStarts){
      case `${n} 第1季`:params['searchStart'] = `${n}-01-01`; break;
      case `${n} 第2季`:params['searchStart'] = `${n}-04-01`; break;
      case `${n} 第3季`:params['searchStart'] = `${n}-07-01`; break;
      case `${n} 第4季`:params['searchStart'] = `${n}-10-01`; break;
      default: params['searchStart'] = `${this.year}-01-01`; break;
    }
    switch(this.timeEnd){
      case `${m} 第1季`:params['searchEnd'] = `${m}-03-31`; break;
      case `${m} 第2季`:params['searchEnd'] = `${m}-06-30`; break;
      case `${m} 第3季`:params['searchEnd'] = `${m}-09-30`; break;
      case `${m} 第4季`:params['searchEnd'] = `${m}-12-31`; break;
      default: params['searchEnd'] = `${this.year}-12-31`; break;
    }
  }

  // 更新某条数据
  updateDaily(daily) {
    for (let i = 0; i < this.dailyList.length; i++) {
      if (this.dailyList[i]['dailyId'] === daily.dailyId) {
        this.dailyList[i] = daily;
        return;
      }
    }
  }

  // 删除某条数据
  deleteDaily(dailyId) {
    for (let i = 0; i < this.dailyList.length; i++) {
      if (this.dailyList[i]['dailyId'] === dailyId) {
        this.dailyList.splice(i,1);
        return;
      }
    }
  }

  // 获取图片地址
  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`;
  }

  // ============================ Events ============================

  // 点击取消
  onClickCancel() {
    this.navCtrl.pop();
  }

  // 点击搜索
  onClickSearch() {
    this.selectTimeShowFlag = false;
    this.resetList();
  }

  // 点击清除并搜索
  onClickClearSearch() {
    this.selectString = '';
    this.selectTimeShowFlag = false;
    this.resetList();
  }

  // 点击重置查询条件
  onClickResetCondition() {
    this.timeStarts = '';
    this.timeEnd = '';
    this.selectTimeShowFlag = true;
  }

  // 点击日志
  onClickDaily(daily) {
    this.navCtrl.push(DailyThreeShowPage, {
      dailyThree: daily,
      user: this.user,
      onUpdate: (daily) => {
        this.updateDaily(daily);
        this.onUpdate(daily);
      },
      onDelete: (daily) => {
        this.deleteDaily(daily);
        this.onDelete(daily);
      }
    });
  }

  // 滚动加载
  onScrollDailyList(infinite?: InfiniteScroll) {
    this._getLogDailyList({endTime: this.dailyList[this.dailyList.length - 1]['publishTime']}).subscribe((data) => {
      data && data.list && (this.dailyList = this.dailyList.concat(data.list));
      infinite.complete();
    });
  }






  // goBack() {
  //   this.navCtrl.pop();
  // }

  // // 重置
  // reset() {
  //   this.timeStarts = '';
  //   this.timeEnd = '';
  //   this.selectTimeShowFlag = true;
  // }

  // updateDaily(daily) {
  //   for (let i = 0; i < this.dailyList.length; i++) {
  //     if (this.dailyList[i]['dailyId'] === daily.dailyId) {
  //       this.dailyList[i] = daily;
  //       return;
  //     }
  //   }
  // }

  // deleteDaily(dailyId) {
  //   for (let i = 0; i < this.dailyList.length; i++) {
  //     if (this.dailyList[i]['dailyId'] === dailyId) {
  //       this.dailyList.splice(i,1);
  //       return;
  //     }
  //   }
  // }

  // // 跳转详情页面
  // goDailyShow(daily) {
  //   this.navCtrl.push(DailyMeShowPage, {
  //     daily: daily,
  //     onSearchUpdate: this.updateDaily.bind(this),
  //     onSearchDelete: this.deleteDaily.bind(this),
  //     onUpdate: this.onUpdate,
  //     onDelete: this.onDelete
  //   });
  // }

  // // 搜索确定按钮实现
  // goSelcet(event: any) {
  //   this.selectTimeShowFlag = false;
  //   this.initLogDailyList();
  // }

  // // 将季转换为日期
  // changeToDate(params) {
  //   var n = this.timeStarts.match(/[0-9]+/);
  //   var m = this.timeEnd.match(/[0-9]+/);
  //   switch(this.timeStarts){
  //     case `${n} 第1季`:params['searchStart'] = `${n}-01-01`; break;
  //     case `${n} 第2季`:params['searchStart'] = `${n}-04-01`; break;
  //     case `${n} 第3季`:params['searchStart'] = `${n}-07-01`; break;
  //     case `${n} 第4季`:params['searchStart'] = `${n}-10-01`; break;
  //   }
  //   switch(this.timeEnd){
  //     case `${m} 第1季`:params['searchEnd'] = `${m}-03-31`; break;
  //     case `${m} 第2季`:params['searchEnd'] = `${m}-06-30`; break;
  //     case `${m} 第3季`:params['searchEnd'] = `${m}-09-30`; break;
  //     case `${m} 第4季`:params['searchEnd'] = `${m}-12-31`; break;
  //   }
  // }

  // more(boolSearch = true, infinite?: InfiniteScroll) {
  //   let loading = this.loadingCtrl.create({
  //     content: '处理中...'
  //   });
  //   this.infinite && this.infinite.enable(true);
  //   let params = {
  //     size: this.size,
  //     userCode: this.user.userCode,
  //     searchKeyword: this.selectString,
  //     searchStart: this.timeStarts,
  //     searchEnd: this.timeEnd
  //   };
  //   this.changeToDate(params);

  //   if (boolSearch && this.dailyList.length) {
  //     params['endTime'] = this.dailyList[this.dailyList.length - 1]['publishTime'];
  //   }
  //   this.onceLoad-->0?loading.present():'';
  //   this.dailyProvider.getDailyThreeList(params).subscribe(
  //     (data) => {
  //       if(!boolSearch && !(this.dailyList == data.list && !data.list)){
  //         loading.present();
  //       };
  //       if(!data.list){
  //         this.showNotFound = true;
  //       };
  //       loading.dismiss();
  //       infinite && infinite.complete();
  //       if(!params['endTime'] && data.list == ''){
  //         this.dailyList = [];
  //       }
  //       if (data.list.length) {
  //         infinite && infinite.enable(true);
  //         boolSearch? this.dailyList = this.dailyList.concat(data): this.dailyList = data.list;
  //       } else {
  //         infinite && infinite.enable(false);
  //       }
  //     }
  //   );

  // }

  // getImageUrl(img) {
  //   return `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`;
  // }

}
