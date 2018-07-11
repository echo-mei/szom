import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { DynamicProvider } from '../../providers/dynamic/dynamic';
import { BASE_URL } from '../../config';
import { DailyProvider } from '../../providers/daily/daily';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-user-dynamic-list',
  templateUrl: 'user-dynamic-list.html',
})
export class UserDynamicListPage {

  @ViewChild('infinite') infinite: InfiniteScroll;

  user: any;

  size = 10;
  logDataList: Array<object> = [];  // 日志列表
  stlikeList: Array<object> = []; // 点赞列表
  stlikeSum: number = 0;  // 总点赞

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dynamicProvider: DynamicProvider,
    public dailyProvider: DailyProvider,
    public storage: StorageProvider
  ) {
    this.user = this.navParams.get('user');
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
    this.dynamicProvider.getPersonDynamicList(params).subscribe(
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
    this.dynamicProvider.getPersonDynamicList(params).subscribe(
      (data) => {
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
      accountCode: JSON.parse(this.storage.get('user')).userCode
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

  goDailyShow(dynamic) {
    this.navCtrl.push('UserDynamicShowPage', {
      dynamic: dynamic,
      onUpdate: (dynamic) => {
        console.log(dynamic);
        for (let i = 0; i < this.logDataList.length; i++) {
          if (this.logDataList[i]['dynamicId'] === dynamic.dynamicId) {
            this.logDataList[i] = dynamic;
            return;
          }
        }
      }
    });
  }

}
