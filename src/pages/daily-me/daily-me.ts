import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, InfiniteScroll, PopoverController, LoadingController } from 'ionic-angular';
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

  @ViewChild('infinite') infinite: InfiniteScroll;

  user: any;
  newFlag:any;

  size = 10;
  logDataList: Array<object> = [];  // 日志列表
  stlikeList: Array<object> = []; // 点赞列表
  stlikeSum: number = 0;  // 总点赞
  dataLoadOver = false; //数据加载完成标志
  loading = this.loadingCtrl.create({
    content: '处理中...',
    // showBackdrop:false,
    cssClass: 'loading-new'
  });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public events: Events,
    public storage: StorageProvider,
    public emojiProvider: EmojiProvider,
    public popoverCtrl:PopoverController,
    public loadingCtrl:LoadingController
  ) {
    this.user = this.navParams.get('user');
    this.newFlag = this.navParams.get('newFlag');
    this.getfindSTLike();
    this.initLogDailyList();
  }

  initLogDailyList() {
    this.logDataList = [];
    this.more();
  }

  load() {
    let params = {
      size: this.size,
      userCode: this.user.userCode
    };
    if (this.logDataList.length) {
      params['startTime'] = this.logDataList[0]['publishTime'];
    }
    this.dailyProvider.getLogDailyList(params).subscribe(
      (data) => {
        if (data.length) {
          for (let i = data.length - 1; i >= 0; i--) {
            this.logDataList.unshift(data[i]);
          }
        }
      }
    );
  }

  more(infinite?: InfiniteScroll) {
    this.infinite && this.infinite.enable(true);
    let params = {
      size: this.size,
      userCode: this.user.userCode
    };
    if (this.logDataList.length) {
      params['endTime'] = this.logDataList[this.logDataList.length - 1]['publishTime'];
    }
    if (!infinite) {
      this.loading.present();
    }
    this.dailyProvider.getLogDailyList(params).subscribe(
      (data) => {
        if (!infinite) {
          this.dataLoadOver = true;
          this.loading.dismiss();
        }
        infinite && infinite.complete();
        if (data.length) {
          infinite && infinite.enable(true);
          this.logDataList = this.logDataList.concat(data);
        } else {
          infinite && infinite.enable(false);
        }
      }
    );
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

  getfindSTLike() {
    this.dailyProvider.getfindSTLike({
      accountCode: this.user.userCode
    }).subscribe(
      (data) => {
        let that = this;
        this.stlikeList = data;
        this.stlikeList.forEach((val) => {
          that.stlikeSum += val["likeCounts"];
        });
      }
    )
  }

  updateDaily(daily) {
    for (let i = 0; i < this.logDataList.length; i++) {
      if (this.logDataList[i]['dailyId'] === daily.dailyId) {
        this.logDataList[i] = daily;
        return;
      }
    }
  }

  deleteDaily(dailyId) {
    for (let i = 0; i < this.logDataList.length; i++) {
      if (this.logDataList[i]['dailyId'] === dailyId) {
        this.logDataList.splice(i,1);
        return;
      }
    }
  }

  goDailyShow(daily) {
    this.navCtrl.push(DailyMeShowPage, {
      daily: daily,
      onUpdate: this.updateDaily.bind(this),
      onDelete: this.deleteDaily.bind(this)
    });
  }

  goDailyCreate() {
    this.navCtrl.push(DailyMeCreatePage, {
      onCreate: this.load.bind(this)
    });
  }

  goDailySearch() {
    this.navCtrl.push(DailyMeSearchPage,{
      user: this.user,
      onUpdate: this.updateDaily.bind(this),
      onDelete: this.deleteDaily.bind(this)
    });
  }

  showDetailLike() {
    let popover = this.popoverCtrl.create(LikeStatisticsPage,{
      stlikeList:this.stlikeList,
      stlikeSum:this.stlikeSum
    }, {
      cssClass: 'daily-likelist-pop'
    });
    popover.present();
  }

}
