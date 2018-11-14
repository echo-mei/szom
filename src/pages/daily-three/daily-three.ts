import { Component, Input } from '@angular/core';
import { NavController, NavParams, InfiniteScroll, Events } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';
import { DailyThreeCreatePage } from '../daily-three-create/daily-three-create';
import { DailyThreeShowPage } from '../daily-three-show/daily-three-show';
import { DailyThreeSearchPage } from '../daily-three-search/daily-three-search';
import { Observable } from 'rxjs';
import * as _ from 'underscore';

@Component({
  selector: 'page-daily-three',
  templateUrl: 'daily-three.html',
})
export class DailyThreePage {

  // 用户
  @Input() user: any = {};

  // 当前用户
  me: any;
  // 每页显示条数
  size: number = 10;
  // 每季三励列表
  dailyThreeList: any[] = [];
  // 每周日志数配置
  count: number;
  // 当前季
  quarter: any = {};
  // 当前序号
  currentNumber: number;
  // 是否能创建当前季
  canCreate: boolean = false;
  // 是否正在加载数据
  isLoading = false;
  // 是否还有更多数据
  hasMore: boolean = true;
  // 服务器时间
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
    return this.dailyProvider.getDailyThreeList(params).mergeMap(
      (data) => {
        this.count = data.count;
        this.quarter = this.dateUtil.getQuarterOfDay(new Date(data.serverTime));
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
    this.dailyThreeList = [];
    this._getLogDailyList().subscribe((data: any) => {
      this.formateList(data.list);
      this.checkCanCreate();
    });
  }

  // 数据列表的格式变换
  formateList(list) {
    list = _.groupBy(list, function(item) {
      return `${item.year}-${item.quarterNums}`;
    });
    for(let key in list) {
      let quarterList = this.dailyThreeList.find((item) => {
        return item.quarter.year == key.split('-')[0] && item.quarter.index == key.split('-')[1];
      });
      if(quarterList) {
        quarterList.list.concat(list[key]);
      }
      this.dailyThreeList.push({
        quarter: {
          year: key.split('-')[0],
          index: key.split('-')[1]
        },
        list: list[key]
      });
    }
  }

  // 检查是否可以创建当前季的记录
  checkCanCreate() {
    const currentQuarterList = this.dailyThreeList.find((item) => {
      return item.quarter.year == this.quarter.year && item.quarter.index == this.quarter.index;
    });
    if(!currentQuarterList) {
      this.currentNumber = 1;
      this.canCreate = true;
      return;
    }
    this.currentNumber = currentQuarterList.list.length + 1;
    this.canCreate = currentQuarterList && currentQuarterList.list.length >= this.count ? false : true;
  }

  // 判断记录是否为本季
  isCurrentQuarter(log) {
    return this.quarter.year == log.year && this.quarter.index == log.quarterNums;
  }

  // 获取图片地址
  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`;
  }

  //================= Events =======================

  // 滚动加载
  onScrollDailyList(infinite?: InfiniteScroll) {
    let params = {};
    if(this.dailyThreeList.length) {
      const list = this.dailyThreeList[this.dailyThreeList.length - 1].list;
      params['endTime'] = list[list.length - 1]['publishTime'];
    }
    this._getLogDailyList(params).subscribe((data) => {
      this.formateList(data.list);
      infinite.complete();
    });
  }

  // 点击创建
  onClickCreate() {
    this.navCtrl.push(DailyThreeCreatePage, {
      year: this.quarter.year,
      quarter: this.quarter,
      user: this.user,
      count: this.count,
      onCreate: this.resetLogDailyList.bind(this)
    });
  }

  // 点击记录
  onClickDaily(daily) {
    this.navCtrl.push(DailyThreeShowPage, {
      user:this.user,
      dailyThree: daily,
      count: this.count,
      onUpdate: this.resetLogDailyList.bind(this),
      onDelete: this.resetLogDailyList.bind(this)
    });
  }

  // 点击搜索
  onClickSearch(){
    this.navCtrl.push(DailyThreeSearchPage, {
      user: this.user,
      year: this.quarter.year
    });
  }

}
