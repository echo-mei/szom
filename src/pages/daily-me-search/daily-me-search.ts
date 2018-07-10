import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-daily-me-search',
  templateUrl: 'daily-me-search.html',
})
export class DailyMeSearchPage {
  @ViewChild('infinite') infinite: InfiniteScroll;

  onUpdate: (daily) => {};
  onDelete: (dailyId) => {};

  user: any;
  size: number = 10;
  timeStarts: string = "";
  timeEnd: string = "";
  searchQuery: string = '';
  selectTimeShowFlag = false;
  //原数据
  dailyList: Array<object>;
  // 搜索关键词
  selectString: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public dateUtil: DateUtilProvider,
    public storage: StorageProvider
  ) {
  }

  ionViewDidLoad() {
    this.user = this.navParams.get('user');
    this.onUpdate = this.navParams.get('onUpdate');
    this.onDelete = this.navParams.get('onDelete');
    this.initLogDailyList();
  }

  initLogDailyList() {
    this.dailyList = [];
    this.more();
  }

  goBack() {
    this.navCtrl.pop();
  }

  // 搜索正则高亮匹配
  highLight(str, keyword) {
    //正则替换 
    //g （全文查找出现的所有 pattern） 
    if (keyword) {
      let hlValue = new RegExp(keyword, "g");
      str = str.replace(hlValue, "<font class='hightBright'>" + keyword + "</font>");
    }
    return str;
  }
  // 重置
  reset() {
    this.timeStarts = '';
    this.timeEnd = '';
    this.selectTimeShowFlag = true;
  }

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
    this.navCtrl.push('DailyMeShowPage', {
      daily: daily,
      onUpdate: this.updateDaily.bind(this),
      onDelete: this.deleteDaily.bind(this)
    });
  }

  // 搜索确定按钮实现
  goSelcet(event: any) {
    this.selectTimeShowFlag = false;
    this.initLogDailyList();
  }

  more(infinite?: InfiniteScroll) {
    this.infinite && this.infinite.enable(true);
    let params = {
      size: this.size,
      userCode: this.user.userCode,
      searchKeyword: this.selectString,
      searchStart: this.timeStarts,
      searchEnd: this.timeEnd
    };
    if (this.dailyList.length) {
      params['endTime'] = this.dailyList[this.dailyList.length - 1]['publishTime'];
    }
    this.dailyProvider.getLogDailyList(params).subscribe(
      (data) => {
        infinite && infinite.complete();
        if (data.length) {
          infinite && infinite.enable(true);
          this.dailyList = this.dailyList.concat(data);
        } else {
          infinite && infinite.enable(false);
        }
      }
    );

  }
}
