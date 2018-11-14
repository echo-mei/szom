import { Component, Input} from '@angular/core';
import { NavController, NavParams, Events, InfiniteScroll } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { BASE_URL } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';
import { DailyTenCreatePage } from '../daily-ten-create/daily-ten-create';
import { DailyTenShowPage } from '../daily-ten-show/daily-ten-show';
import { DailyTenSearchPage } from '../daily-ten-search/daily-ten-search';
import { Observable } from 'rxjs';
import * as _ from 'underscore';

@Component({
  selector: 'page-daily-ten',
  templateUrl: 'daily-ten.html',
})
export class DailyTenPage {

  // 用户
  @Input() user: any = {};

  // 当前用户
  me: any;
  // 每页显示条数
  size:number = 10;
  // 每年十励列表
  dailyTenList: any[] = [];
  // 当前年
  year:number;
  // 当前序号
  currentNumber: number;
  // 是否可以创建本年
  canCreate: boolean = false;
  // 每年日志数配置
  count:number;
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
    this.resetDailyList();
  }

  // =================== Public Methods =====================

  // 获取列表数据
  _getLogDailyList(params?) {
    params = {
      size: this.size,
      userCode: this.user.userCode,
      ...params
    };
    return this.dailyProvider.getDailyTenList(params).mergeMap(
      (data) => {
        this.count = data.count;
        this.year = new Date(data.serverTime).getFullYear();
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

  // 重置列表数据
  resetDailyList() {
    this.isLoading = true;
    this.dailyTenList = [];
    this._getLogDailyList().subscribe((data: any) => {
      this.formateList(data.list);
    });
  }

  // 数据列表的格式变换
  formateList(list) {
    list = _.groupBy(list, function(item) {
      return item.year;
    });
    for(let key in list) {
      let yearList = this.dailyTenList.find((item) => {
        return item.year == key;
      });
      if(yearList) {
        yearList.list.concat(list[key]);
      }
      this.dailyTenList.push({
        year: key,
        list: list[key]
      });
    }
    this.checkCanCreate();
  }

  // 检查是否可以创建当前周的记录
  checkCanCreate() {
    const currentYearList = this.dailyTenList.find((item) => {
      return item.year == this.year;
    });
    if(!currentYearList) {
      this.currentNumber = 1;
      this.canCreate = true;
      return;
    }
    this.currentNumber = currentYearList.list.length + 1;
    this.canCreate = currentYearList && currentYearList.list.length >= this.count ? false : true;
  }

  // 判断记录是否为本年
  isCurrentYear(log) {
    return this.year == log.year;
  }

  // 获取图片地址
  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`;
  }

  //================= Events =======================

  // 滚动加载
  onScrollDailyList(infinite?: InfiniteScroll) {
    let params = {};
    if(this.dailyTenList.length) {
      const list = this.dailyTenList[this.dailyTenList.length - 1].list;
      params['endTime'] = list[list.length - 1]['publishTime'];
    }
    this._getLogDailyList(params).subscribe((data) => {
      this.formateList(data.list);
      infinite.complete();
    });
  }

  // 点击创建
  onClickCreate() {
    this.navCtrl.push(DailyTenCreatePage, {
      year: this.year,
      user:this.user,
      count: this.count,
      onCreate: this.resetDailyList.bind(this)
    });
  }

  // 点击记录
  onClickDailly(log) {
    this.navCtrl.push(DailyTenShowPage, {
      user:this.user,
      dailyTen: log,
      count: this.count,
      onDelete: this.resetDailyList.bind(this),
      onUpdate: this.resetDailyList.bind(this)
    });
  }

  // 点击搜索
  onClickSearch(){
    this.navCtrl.push(DailyTenSearchPage, {
      user:this.user
    });
  }

}
