import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { DateUtilProvider } from '../../providers/date-util/date-util';


@IonicPage()
@Component({
  selector: 'page-daily-three-search',
  templateUrl: 'daily-three-search.html',
})
export class DailyThreeSearchPage {
  @ViewChild('infinite') infinite: InfiniteScroll;
  onUpdate: (daily) => {};
  onDelete: (dailyId) => {};
  user: any;
  size: number = 10;
  timeStarts: string = "";
  timeEnd: string = "";
  searchQuery: string = '';
  keywords = '';  /*关键词*/
  selectTimeShowFlag = false;

  //原数据
  dailyList: Array<object>;
  selectString: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public dateUtil: DateUtilProvider) {

  }

  ionViewDidLoad() {
    this.user = this.navParams.get('user');
    this.onUpdate = this.navParams.get('onUpdate');
    this.onDelete = this.navParams.get('onDelete');
    console.log(this.user);
    this.initLogDailyList();
  }

  initLogDailyList() {
    this.dailyList = [];
    this.more();
  }

  goBack() {
    this.navCtrl.pop();
  }

  // 重置
  reset() {
    this.timeStarts = '';
    this.timeEnd = '';
    this.selectTimeShowFlag = true;
  }

  updateDaily(daily) {
    for (let i = 0; i < this.dailyList.length; i++) {
      if (this.dailyList[i]['dailyId'] === daily.dailyId) {
        this.dailyList[i] = daily;
        return;
      }
    }
  }

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
    this.navCtrl.push('DailyMeShowPage', {
      daily: daily,
      onSearchUpdate: this.updateDaily.bind(this),
      onSearchDelete: this.deleteDaily.bind(this),
      onUpdate: this.onUpdate,
      onDelete: this.onDelete
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
    this.dailyProvider.getDailyThreeList(params).subscribe(
      (data) => {
        console.log(data);
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
