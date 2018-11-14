import { Component } from '@angular/core';
import { NavController, NavParams, InfiniteScroll, ModalController } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';
import { DailyMeShowPage } from '../daily-me-show/daily-me-show';
import { BetweenDatePickerComponent } from '../../components/between-date-picker/between-date-picker';
import { DailyTenShowPage } from '../daily-ten-show/daily-ten-show';

@Component({
  selector: 'page-daily-ten-search',
  templateUrl: 'daily-ten-search.html',
})
export class DailyTenSearchPage {

  onUpdate: (daily) => {};
  onDelete: (dailyId) => {};

  // 当前用户
  user: any;
  // 每页显示条数
  size: number = 10;
  // 开始时间
  timeStarts: string = '';
  // 结束时间
  timeEnd: string = '';
  // 原数据
  dailyList: Array<object> = [];
  // 搜索关键字
  selectString: string = '';
  // 是否正在加载
  isLoading: boolean = true;
  // 是否有更多数据
  hasMore: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public dateUtil: DateUtilProvider,
    public storage: StorageProvider,
    public modalCtrl: ModalController
  ) {
    this.user = this.navParams.get('user');
    this.onUpdate = this.navParams.get('onUpdate');
    this.onDelete = this.navParams.get('onDelete');
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
    return this.dailyProvider.getDailyTenList(p).do(
      data => {
        this.hasMore = data && data.list.length ? true : false;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  // 重置列表
  resetList() {
    this.isLoading = true;
    this.dailyList = [];
    this.getLogDailyList().subscribe((data) => {
      data && data.list && (this.dailyList = data.list);
    });
  }

  // 搜索
  search() {
    this.resetList();
  }

  // 加载更多
  more(infinite?: InfiniteScroll) {
    this.getLogDailyList({endTime: this.dailyList[this.dailyList.length - 1]['publishTime']}).subscribe((data) => {
      data && data.list && (this.dailyList = this.dailyList.concat(data.list));
      infinite.complete();
    });
  }

  // 选择时间跨度
  goSelectDate() {
    this.modalCtrl.create(BetweenDatePickerComponent, {
      afterSure: (start, end) => {
        this.timeStarts = this.dateUtil.format(start, 'yyyy-MM-dd');
        this.timeEnd = this.dateUtil.format(end, 'yyyy-MM-dd');
        this.search();
      }
    }).present();
  }

  // 返回
  goBack() {
    this.navCtrl.pop();
  }

  // 更新日志
  updateDaily(daily) {
    for (let i = 0; i < this.dailyList.length; i++) {
      if (this.dailyList[i]['dailyId'] === daily.dailyId) {
        this.dailyList[i] = daily;
        return;
      }
    }
  }

  // 删除日志
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
    this.navCtrl.push(DailyTenShowPage, {
      user: this.user,
      count: 10,
      dailyTen: daily,
      onSearchUpdate: this.updateDaily.bind(this),
      onSearchDelete: this.deleteDaily.bind(this),
      onUpdate: this.onUpdate,
      onDelete: this.onDelete
    });
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`;
  }

}
