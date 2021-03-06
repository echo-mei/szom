import { Component, Input } from '@angular/core';
import { NavController, NavParams, Events, InfiniteScroll, PopoverController, ModalController } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { BASE_URL } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';
import { DailyMeShowPage } from '../daily-me-show/daily-me-show';
import { DailyMeCreatePage } from '../daily-me-create/daily-me-create';
import { DailyMeSearchPage } from '../daily-me-search/daily-me-search';
import { EmojiProvider } from '../../providers/emoji/emoji';
import { LikeStatisticsPage } from '../like-statistics/like-statistics';

@Component({
  selector: 'page-daily-me',
  templateUrl: 'daily-me.html',
})
export class DailyMePage {

  // 用户
  @Input() user: any = {};

  // 当前用户
  me: any;
  // 每页显示条数
  size = 10;
  // 日志列表
  logDataList: Array<object> = [];
  // 点赞统计列表
  stlikeList: Array<object> = [];
  // 总点赞数
  stlikeSum: number = 0;
  // 是否正在加载数据
  isLoading = false;
  // 是否还有更多数据
  hasMore: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public events: Events,
    public storage: StorageProvider,
    public emojiProvider: EmojiProvider,
    public popoverCtrl:PopoverController,
    public modalCtrl: ModalController
  ) {
    this.me = this.storage.me;
  }

  ngOnInit() {
    Object.assign(this, this.navParams.data);
    this.resetLikeInfo();
    this.resetLogDailyList();
  }

  // =================== Public Methods =====================
  // 重置统计点赞信息
  resetLikeInfo() {
    this.dailyProvider.getfindSTLike({
      accountCode: this.user.userCode
    }).subscribe(
      (data) => {
        this.stlikeSum = 0;
        this.stlikeList = data;
        this.stlikeList.forEach((val) => {
          this.stlikeSum += val["likeCounts"];
        });
      }
    )
  }

  // 重置日志列表
  resetLogDailyList() {
    this.isLoading = true;
    this._getLogDailyList().subscribe((list) => {
      list.length && (this.logDataList = list);
    });
  }

  // 加载最新数据
  loadLoadDailyList() {
    let params = {};
    this.logDataList.length && (params['startTime'] = this.logDataList[0]['publishTime']);
    this._getLogDailyList(params).subscribe((list) => {
      if (list && list.length) {
        this.logDataList || (this.logDataList = []);
        for (let i = list.length - 1; i >= 0; i--) {
          this.logDataList.unshift(list[i]);
        }
      }
    });
  }

  // 更新某一条日志
  updateDaily(daily) {
    for (let i = 0; i < this.logDataList.length; i++) {
      if (this.logDataList[i]['dailyId'] === daily.dailyId) {
        this.logDataList[i] = daily;
        this.resetLikeInfo();
        return;
      }
    }
  }

  // 删除某一条日志
  deleteDaily(dailyId) {
    for (let i = 0; i < this.logDataList.length; i++) {
      if (this.logDataList[i]['dailyId'] === dailyId) {
        this.logDataList.splice(i,1);
        this.resetLikeInfo();
        return;
      }
    }
  }

  // 获取列表数据
  _getLogDailyList(params?) {
    params = {
      size: this.size,
      userCode: this.user.userCode,
      ...params
    };
    return this.dailyProvider.getLogDailyList(params).do(
      list => {
        this.hasMore = list.length ? true : false;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  // 获取图片地址
  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`;
  }

  // ================ Events ===================

  // 滚动加载
  onScrollDailyList(infinite?: InfiniteScroll) {
    this._getLogDailyList({endTime: this.logDataList[this.logDataList.length - 1]['publishTime']}).subscribe((list) => {
      list && (this.logDataList = this.logDataList.concat(list));
      infinite.complete();
    });
  }

  // 点击日志
  onClikeDaily(daily) {
    this.navCtrl.push(DailyMeShowPage, {
      user:this.user,
      daily: daily,
      onUpdate: this.updateDaily.bind(this),
      onDelete: this.deleteDaily.bind(this)
    });
  }

  // 点击创建
  onClikeCreate() {
    this.navCtrl.push(DailyMeCreatePage, {
      onCreate: this.loadLoadDailyList.bind(this)
    });
  }

  // 点击搜索
  onClickSearch() {
    this.navCtrl.push(DailyMeSearchPage, {
      user: this.user,
      onUpdate: this.updateDaily.bind(this),
      onDelete: this.deleteDaily.bind(this)
    });
  }

  // 点击点赞统计
  onClickLike() {
    this.modalCtrl.create(LikeStatisticsPage, {
      stlikeList:this.stlikeList,
      stlikeSum:this.stlikeSum
    }).present();
    // let popover = this.popoverCtrl.create(LikeStatisticsPage, {
    //   stlikeList:this.stlikeList,
    //   stlikeSum:this.stlikeSum
    // }, {
    //   cssClass: 'daily-likelist-pop'
    // });
    // popover.present();
  }

}
