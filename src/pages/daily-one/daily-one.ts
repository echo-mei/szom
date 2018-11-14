import { Component, Input } from '@angular/core';
import { NavController, NavParams, Events, InfiniteScroll } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';
import { DailyOneCreatePage } from '../daily-one-create/daily-one-create';
import { DailyOneSearchPage } from '../daily-one-search/daily-one-search';
import { DailyOneShowPage } from '../daily-one-show/daily-one-show';
import { Observable } from 'rxjs';
import * as _ from 'underscore';

@Component({
  selector: 'page-daily-one',
  templateUrl: 'daily-one.html',
})
export class DailyOnePage {

  // 用户
  @Input() user: any = {};

  // 当前用户
  me: any;
  // 每页显示条数
  size: number = 10;
  // 每周一励列表
  dailyOneList: any[] = [];
  // 每周日志数配置
  count: number;
  // 当前周
  week: any = {};
  // 是否能创建当前周
  canCreate: boolean = false;
  // 是否正在加载数据
  isLoading = false;
  // 是否还有更多数据
  hasMore: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public dateUtil: DateUtilProvider,
    public events: Events,
    public storage: StorageProvider,
  ) {
    this.me = this.storage.me;
  }

  ngOnInit() {
    Object.assign(this, this.navParams.data);
    this.resetLogDailyList();
  }

  // =================== Public Methods =====================

  // 获取列表数据
  _getLogDailyList(params?) {
    params = {
      size: this.size,
      userCode: this.user.userCode,
      ...params
    };
    return this.dailyProvider.getDailyOneList(params).mergeMap(
      (data) => {
        this.count = data.count;
        this.week = this.dateUtil.getWeekOfDay(new Date(data.serverTime));
        return Observable.create(observer => observer.next(data));
      }
    ).do(
      (data: any) => {
        this.hasMore = data.list.length ? true : false;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  // 重置列表
  resetLogDailyList() {
    this.isLoading = true;
    this.dailyOneList = [];
    this._getLogDailyList().subscribe((data: any) => {
      this.formateList(data.list);
      this.checkCanCreate();
    });
  }

  // 数据列表的格式变换
  formateList(list) {
    list = _.groupBy(list, function(item) {
      return `${item.year}-${item.weekNums}`;
    });
    for(let key in list) {
      let weekList = this.dailyOneList.find((item) => {
        return item.week.year == key.split('-')[0] && item.week.index == key.split('-')[1];
      });
      if(weekList) {
        weekList.list.concat(list[key]);
      }
      this.dailyOneList.push({
        week: {
          year: key.split('-')[0],
          index: key.split('-')[1]
        },
        list: list[key]
      });
    }
  }

  // 检查是否可以创建当前周的记录
  checkCanCreate() {
    const currentWeekList = this.dailyOneList.find((item) => {
      return item.week.year == this.week.year && item.week.index == this.week.index+1;
    });
    if(!currentWeekList) {
      this.canCreate = true;
      return;
    }
    this.canCreate = currentWeekList && currentWeekList.list.length >= this.count ? false : true;
  }

  // 判断记录是否为本周
  isCurrentWeek(log) {
    return this.week.year == log.year && this.week.index+1 == log.weekNums;
  }

  // 获取图片地址
  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`;
  }

  //================= Events =======================

  // 滚动加载
  onScrollDailyList(infinite?: InfiniteScroll) {
    let params = {};
    if(this.dailyOneList.length) {
      const list = this.dailyOneList[this.dailyOneList.length - 1].list;
      params['endTime'] = list[list.length - 1]['publishTime'];
    }
    this._getLogDailyList(params).subscribe((data) => {
      this.formateList(data.list);
      infinite.complete();
    });
  }

  // 点击创建
  onClickCreate() {
    this.navCtrl.push(DailyOneCreatePage, {
      week: this.week,
      user: this.user,
      count: this.count,
      onCreate: this.resetLogDailyList.bind(this)
    });
  }

  // 点击记录
  onClickDailly(one) {
    this.navCtrl.push(DailyOneShowPage, {
      user:this.user,
      dailyOne: one,
      count: this.count,
      onDelete: this.resetLogDailyList.bind(this),
      onUpdate: this.resetLogDailyList.bind(this)
    });
  }

  // 点击搜索
  onClickSearch(){
    this.navCtrl.push(DailyOneSearchPage, {
      user: this.user,
    });
  }
}
