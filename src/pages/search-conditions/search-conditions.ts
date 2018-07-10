import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, InfiniteScroll } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { DateUtilProvider } from '../../providers/date-util/date-util';

@IonicPage()
@Component({
  selector: 'page-search-conditions',
  templateUrl: 'search-conditions.html'
})
export class SearchConditionsPage {

  @ViewChild('infinite') infinite: InfiniteScroll;

  size = 10;
  timeStarts: string = "";
  timeEnd: string = "";

  selectTimeShowFlag = false;

  //原数据
  logDataList: Array<object>;

  selectString: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public dailyProvider: DailyProvider,
    public dateUtil: DateUtilProvider
  ) {
    this.initLogDailyList();
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

  // 跳转详情页面
  goDailyShow(daily) {
    this.navCtrl.push('DailyShowPage',{
      daily: daily
    });
  }

  initLogDailyList() {
    this.logDataList = [];
    this.more();
  }

  // 搜索确定按钮实现
  goSelcet(event) {
    this.selectTimeShowFlag = false;
    this.initLogDailyList();
  }

  more(infinite?: InfiniteScroll) {
    this.infinite && this.infinite.enable(true);
    let params = {
      size: this.size,
      searchKeyword: this.selectString,
      searchStart: this.timeStarts,
      searchEnd: this.dateUtil.format(new Date(this.timeEnd), 'yyyy-MM-dd')
    };
    if(this.logDataList.length) {
      params['endTime'] = this.logDataList[this.logDataList.length - 1]['publishTime'];
    }
    this.dailyProvider.getLogDailyList(params).subscribe(
      (data) => {
        infinite&&infinite.complete();
        if(data.length) {
          infinite && infinite.enable(true);
          this.logDataList = this.logDataList.concat(data);
        }else {
          infinite && infinite.enable(false);
        }
      }
    );

    // let params = {
    //   startTime:this.timeStarts,
    //   endTime:this.timeEnd,
    //   searchKeyword:this.selectString,
    //   size: this.size
    // };
    // if(this.logDataList.length) {
    //   params.endTime = this.logDataList[this.logDataList.length - 1]['publishTime'];
    // }
    // this.DailyProvider.getLogDailyList(params).subscribe(
    //   (data) => {
    //     infinite&&infinite.complete();
    //     if(data.length) {
    //       infinite && infinite.enable(true);
    //       this.logDataList = this.logDataList.concat(data);
    //     }else {
    //       infinite && infinite.enable(false);
    //     }
    //   }
    // );
  }

}
