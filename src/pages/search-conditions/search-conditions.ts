import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, InfiniteScroll } from 'ionic-angular';
import {
  trigger, state, style, animate, transition
} from '@angular/animations';
import { DailyProvider } from '../../providers/daily/daily';

@IonicPage()
@Component({
  selector: 'page-search-conditions',
  templateUrl: 'search-conditions.html',
  animations: [
    trigger('selectState', [
      state('into', style({
        display: 'block'
      })),
      state('leave', style({
        display: 'none'
      })),
      transition('into => leave', animate('100ms ease-in')),
      transition('leave => into', animate('100ms ease-out'))
    ]),
    trigger('contentBg', [
      state('into', style({
        display: 'block'
      })),
      state('leave', style({
        display: 'none'
      })),
      transition('into => leave', animate('100ms ease-in')),
      transition('leave => into', animate('100ms ease-out'))
    ])
  ]
})
export class SearchConditionsPage {

  page = 0;
  size = 10;
  timeStarts: string = "";
  timeEnd: string = "";

  selectTimeShowFlag = false;
  isTimeStart: boolean = true;
  isTimeEnd: boolean = true;
  //搜索栏状态
  animate: string = 'leave';
  animateBg: string = 'white';
  //图标
  selectBtn: string = 'md-xia';
  //原数据
  logDataList: Array<object>;

  selectString: string = '';
  //搜索数据
  selectDialyList: Array<object> = [];
  selectIndex = [];
  //暂存数据
  storageDialy: Array<object> = [];

  dialyList: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public DailyProvider: DailyProvider
  ) {
    this.initLogDailyList();
  }

  goBack() {
    this.navCtrl.pop();
  }
  TimeStartChange() {
    this.isTimeStart = false;
  }
  TimeEndChange() {
    this.isTimeEnd = false;
  }
  // 重置
  reset() {
    this.isTimeStart = true;
    this.isTimeEnd = true;
    this.timeStarts = '';
    this.timeEnd = '';
  }
  //点击筛选栏效果及动画变更
  selectShow(event) {
    if (this.animate == 'into') {
      this.animate = 'leave';
      this.animateBg = 'white';
      this.selectBtn = 'md-xia';
    } else {
      this.animate = 'into';
      this.animateBg = 'black';
      this.selectBtn = 'md-shang';
    }

  }

  // getLogDailyList() {
  //   this.DailyProvider.getLogDailyList({
  //     startTime:this.timeStarts,
  //     endTime:this.timeEnd,
  //     searchKeyword:this.selectString,
  //     size: this.size,
  //     page: this.page
  //   }).subscribe(
  //     (data) => {
  //       this.logDataList = data;
  //       this.selectDialyList = data;
  //     }
  //   );
  // }
  //跳转详情页面
  goDailyShow(daily) {
    if (this.animate != "into") {
      this.navCtrl.push('DailyShowPage',{
        daily: daily
      });
    }
  }

  initLogDailyList() {
    this.page = 0;
    this.size = 10;
    this.logDataList = [];
    this.more();
  }

  //搜索确定按钮实现
  goSelcet(event) {
    // this.getSelectDialy1(event);
    // this.getSelectDialy2();
    this.animate = 'leave';
    this.animateBg = 'white';
    this.selectBtn = 'md-xia';
    this.initLogDailyList();
  }
  more(infinite?: InfiniteScroll) {
    this.DailyProvider.getLogDailyList({
      startTime:this.timeStarts,
      endTime:this.timeEnd,
      searchKeyword:this.selectString,
      size: this.size,
      page: this.page
    }).subscribe(
      (data) => {
        infinite&&infinite.complete();
        if(data.length) {
          infinite && infinite.enable(true);
          this.page = this.page+1;
          this.logDataList = this.logDataList.concat(data);
        }else {
          infinite && infinite.enable(false);
        }
        this.logDataList = this.logDataList.concat(data);
      }
    );
  }
  // //时间转换
  // timeConversion(dateTime) {
  //   var arrStart, startTime, startTimes;
  //   arrStart = dateTime.split("-");
  //   startTime = new Date(arrStart[0], arrStart[1], arrStart[2]);
  //   startTimes = startTime.getTime();
  //   return startTime;
  // }
  // //搜索栏条件一：关键字字符串匹配
  // getSelectDialy1(searchbar) {
  //   this.selectDialyList = [], this.selectIndex = [];
  //   if (this.selectString != '') {
  //     for (var index in this.logDataList) {
  //       let strIndex = this.logDataList[index]['title'].indexOf(this.selectString);
  //       if (strIndex != -1) {
  //         this.selectDialyList.push(this.logDataList[index]);
  //         this.selectIndex.push(strIndex);
  //       }
  //     }
  //   } else {
  //     for (var index1 in this.logDataList){
  //       this.selectDialyList.push(this.logDataList[index1]);
  //     }
  //   }
  // }

  // //搜索栏条件二：时间截匹配
  // getSelectDialy2() {
  //   var startTime, endTime;
  //   if (this.timeStarts) {
  //     startTime = this.timeConversion(this.timeStarts);
  //   }
  //   if (this.timeEnd) {
  //     endTime = this.timeConversion(this.timeEnd);
  //   }
  //   if (startTime && endTime) {
  //     if (endTime < startTime) {
  //       alert("结束时间不能小于开始时间");
  //       this.reset();
  //       return false;
  //     }
  //   }
  //   for (var index = this.selectDialyList.length - 1; index >= 0; index--) {
  //     let dateTime = this.timeConversion(this.selectDialyList[index]['publishTime'].split(" ")[0]);
  //     if (dateTime) {
  //       if (startTime || endTime) {
  //         if (dateTime < startTime || dateTime > endTime) {
  //           this.selectDialyList.splice(index, 1)
  //         }
  //       }
  //     }
  //   }
  //   this.animate = 'leave';
  //   this.animateBg = 'white';
  //   this.selectBtn = 'md-xia';
  //   return true;
  // }
}
