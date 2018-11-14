import { Component } from '@angular/core';
import { NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';
import { DailyOneShowPage } from '../daily-one-show/daily-one-show';
import { DateUtilProvider } from '../../providers/date-util/date-util';

@Component({
  selector: 'page-daily-one-search',
  templateUrl: 'daily-one-search.html',
})
export class DailyOneSearchPage {

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
  // 每周一励列表
  dailyOneList: any[] = [];
  // 展示搜索区域
  selectTimeShowFlag = false;
  // 是否正在加载数据
  isLoading = false;
  // 是否还有更多数据
  hasMore: boolean = true;
  // 时间选择器
  dateControls: object = [
    {
      options: []
    },
    {
      options: []
    }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public storage: StorageProvider,
    public dateUtil: DateUtilProvider,
  ) {
    this.user = this.navParams.get('user');
    this.resetList();
    this.getTime();
  }

  // =================== Public Method =========================

  // 获取日期控件值
  getTime() {
    let startYear = 1900;
    let date, year;
    date = new Date;
    year = date.getFullYear();
    let that = this;
    setTimeout(function () {
      for (let i = 0; i <= year - startYear; i++) {
        that.dateControls[0].options[i] = { text: `${year - i}年`, value: `${year - i}年` }
      };
      that.dateControls[0].options.forEach((element) => {
        year = that.dateUtil.getWeeksOfYear(parseInt(element.value)).length;
        for (let i = 1; i <= year; i++) {
          that.dateControls[1].options.push({ text: `第${i}周`, value: `第${i}周`, parentVal: `${element.value}` });
        }
      });
    }, 100);
  }

  // 重置列表
  resetList() {
    this.isLoading = true;
    this.dailyOneList = [];
    this._getLogDailyList().subscribe((data) => {
      data && data.list && (this.dailyOneList = data.list);
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
      this.getOneWeekOut(params);
    }
    return this.dailyProvider.getDailyOneList(params).do(
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
  getOneWeekOut(params) {
    let startYear = parseInt(params['searchStart']);
    let endYear = parseInt(params['searchEnd']);
    let startWeek = parseInt(params['searchStart'].replace(/[0-9]+/, '').match(/[0-9]+/))-1;
    let endWeek = parseInt(params['searchEnd'].replace(/[0-9]+/, '').match(/[0-9]+/))-1;
    let startDate = new Date(this.dateUtil.getOneWeek(startYear, startWeek).firstDate);
    let endDate = new Date(this.dateUtil.getOneWeek(endYear, endWeek).lastDate);
    params['searchStart'] = startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate();
    params['searchEnd'] = endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+endDate.getDate();
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
  onClickDaily(one) {
    this.navCtrl.push(DailyOneShowPage, {
      user: this.user,
      count: 1,
      dailyOne: one,
      onDelete: this.resetList.bind(this),
      onUpdate: this.resetList.bind(this)
    });
  }

  // 滚动加载
  onScrollDailyList(infinite?: InfiniteScroll) {
    this._getLogDailyList({endTime: this.dailyOneList[this.dailyOneList.length - 1]['publishTime']}).subscribe((data) => {
      data && data.list && (this.dailyOneList = this.dailyOneList.concat(data.list));
      infinite.complete();
    });
  }

}
