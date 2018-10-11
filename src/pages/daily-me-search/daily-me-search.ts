import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, InfiniteScroll, LoadingController, ModalController } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';
import { DailyMeShowPage } from '../daily-me-show/daily-me-show';
import { BetweenDatePickerComponent } from '../../components/between-date-picker/between-date-picker';

@Component({
  selector: 'page-daily-me-search',
  templateUrl: 'daily-me-search.html',
})
export class DailyMeSearchPage {

  onUpdate: (daily) => {};
  onDelete: (dailyId) => {};

  // 当前用户
  user: any;
  // 每页数
  size: number = 10;
  // 开始时间
  timeStarts: string = "";
  // 结束时间
  timeEnd: string = "";
  // 展示时间选择区
  selectTimeShowFlag = false;
  //原数据
  dailyList: Array<object> = [];
  // 搜索关键词
  selectString: string = '';
  // 是否正在加载
  isLoading: boolean = true;
  // 是否有更多数据
  hasMore: boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public dateUtil: DateUtilProvider,
    public storage: StorageProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    this.user = this.navParams.get('user');
    this.onUpdate = this.navParams.get('onUpdate');
    this.onDelete = this.navParams.get('onDelete');
    this.dailyList = [];
    this.resetList();
  }

  // 获取数据
  getLogDailyList(params?) {
    let p = {
      size: this.size,
      userCode: this.user.userCode,
      searchKeyword: this.selectString,
      searchStart: this.timeStarts,
      searchEnd: this.timeEnd,
      ...params
    };
    this.isLoading = true;
    return this.dailyProvider.getLogDailyList(p).do(list => {
      this.hasMore = list.length ? true : false;
      this.isLoading = false;
    });
  }

  // 重置列表
  resetList() {
    this.getLogDailyList().subscribe((list) => {
      this.dailyList = list;
    });
  }

  // 搜索
  search() {
    this.resetList();
  }

  // 返回
  goBack() {
    this.navCtrl.pop();
  }

  // 更新日志
  updateDaily(daily) {
    // 更新日志列表
    this.onUpdate && this.onUpdate(daily);
    // 更新搜索列表
    for (let i = 0; i < this.dailyList.length; i++) {
      if (this.dailyList[i]['dailyId'] === daily.dailyId) {
        this.dailyList[i] = daily;
        return;
      }
    }
  }

  // 删除日志
  deleteDaily(dailyId) {
    // 更新日志列表
    this.onDelete && this.onDelete(dailyId);
    // 更新搜索列表
    for (let i = 0; i < this.dailyList.length; i++) {
      if (this.dailyList[i]['dailyId'] === dailyId) {
        this.dailyList.splice(i, 1);
        return;
      }
    }
  }

  // 跳转详情页面
  goDailyShow(daily) {
    this.navCtrl.push(DailyMeShowPage, {
      daily: daily,
      onUpdate: this.updateDaily.bind(this),
      onDelete: this.deleteDaily.bind(this)
    });
  }

  // 加载更多
  more(infinite?: InfiniteScroll) {
    this.getLogDailyList({endTime: this.dailyList[this.dailyList.length - 1]['publishTime']}).subscribe((list) => {
      list && (this.dailyList = this.dailyList.concat(list));
      infinite.complete();
    });
  }

  // 选择时间跨度
  goSelectDate() {
    // this.selectTimeShowFlag = !this.selectTimeShowFlag;
    this.modalCtrl.create(BetweenDatePickerComponent, {
      afterSure: (start, end) => {
        this.timeStarts = this.dateUtil.format(start, 'yyyy-MM-dd');
        this.timeEnd = this.dateUtil.format(end, 'yyyy-MM-dd');
        this.search();
      }
    }).present();
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }
}
