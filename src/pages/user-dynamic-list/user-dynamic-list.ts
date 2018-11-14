import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, InfiniteScroll, PopoverController, ModalController } from 'ionic-angular';
import { DynamicProvider } from '../../providers/dynamic/dynamic';
import { BASE_URL } from '../../config';
import { DailyProvider } from '../../providers/daily/daily';
import { StorageProvider } from '../../providers/storage/storage';
import { UserDynamicShowPage } from '../user-dynamic-show/user-dynamic-show';
import { LikeStatisticsPage } from '../like-statistics/like-statistics';

@Component({
  selector: 'page-user-dynamic-list',
  templateUrl: 'user-dynamic-list.html',
})
export class UserDynamicListPage {

  @ViewChild('infinite') infinite: InfiniteScroll;

  // 用户
  user: any;
  // 每页显示条数
  size = 10;
   // 日志列表
  logDataList: Array<object> = [];
  // 点赞列表
  stlikeList: Array<object> = [];
  // 总点赞
  stlikeSum: number = 0;
   // 是否正在加载数据
   isLoading = false;
   // 是否还有更多数据
   hasMore: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dynamicProvider: DynamicProvider,
    public dailyProvider: DailyProvider,
    public storage: StorageProvider,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController
  ) {
    this.user = this.navParams.get('user');
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
      this.logDataList = list;
    });
  }

  // 获取列表数据
  _getLogDailyList(params?) {
    params = {
      size: this.size,
      userCode: this.user.userCode,
      ...params
    };
    return this.dynamicProvider.getPersonDynamicList(params).do(
      list => {
        this.hasMore = list.length ? true : false;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  // 加载最新数据
  loadLoadDailyList() {
    let params = {};
    this.logDataList.length && (params['startTime'] = this.logDataList[0]['publishTime']);
    this._getLogDailyList(params).subscribe((list) => {
      if (list && list.length) {
        for (let i = list.length - 1; i >= 0; i--) {
          this.logDataList.unshift(list[i]);
        }
      }
    });
  }

  // 更新某一条日志
  updateDaily(dynamic) {
    for (let i = 0; i < this.logDataList.length; i++) {
      if (this.logDataList[i]['dynamicId'] === dynamic.dynamicId) {
        this.logDataList[i] = dynamic;
        this.resetLikeInfo();
        return;
      }
    }
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
  onClikeDaily(dynamic) {
    this.navCtrl.push(UserDynamicShowPage, {
      dynamic: dynamic,
      onUpdate: this.updateDaily.bind(this)
    });
  }

  // 点击点赞统计
  onClickLike() {
    this.modalCtrl.create(LikeStatisticsPage, {
      stlikeList:this.stlikeList,
      stlikeSum:this.stlikeSum
    }).present();
    // let popover = this.popoverCtrl.create(LikeStatisticsPage,{
    //   stlikeList:this.stlikeList,
    //   stlikeSum:this.stlikeSum
    // }, {
    //   cssClass: 'daily-likelist-pop'
    // });
    // popover.present();
  }

}
