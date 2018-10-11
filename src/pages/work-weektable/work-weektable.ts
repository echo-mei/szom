import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { WorkWeektableCreatePage } from '../work-weektable-create/work-weektable-create';
import { WorkProvider } from '../../providers/work/work';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { DatePipe } from '@angular/common';
import { WorkWeektableStatisticsPage } from '../work-weektable-statistics/work-weektable-statistics';
import { WorkWeektableShowPage } from '../work-weektable-show/work-weektable-show';

/**
 * Generated class for the WorkWeektablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-work-weektable',
  templateUrl: 'work-weektable.html',
  providers: [
    DatePipe
  ]
})
export class WorkWeektablePage {
  @ViewChild('content') content: Content;

  user: any;
  newFlag: any;

  // 一天毫秒数
  private DAY_MILLISECOND = 1 * 24 * 60 * 60 * 1000;

  anchorFlag = 1;
  weektableList = [];
  weekName = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  dateControls: object = [
    {
      options: []
    },
    {
      options: []
    }
  ];
  //当前年份周数
  nowDate = new Date;
  nowYear = this.nowDate.getFullYear();
  weekdate: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public workProvider: WorkProvider,
    public dateUtil: DateUtilProvider,
    public datePipe: DatePipe) {
    this.user = this.navParams.get('user');
    console.log(this.user)
  }

  ionViewDidLoad() {
    this.weekdate = this.mergeYearAndWeek(this.nowDate);
    this.getTime();
    this.getWeektableList();
    this.newFlag = this.navParams.get("newFlag");
  }

  //获取日期控件值
  getTime() {
    let startYear = 1900;

    for (let i = 0; i <= this.nowYear - startYear; i++) {
      this.dateControls[0].options[i] = { text: `${this.nowYear - i}年`, value: `${this.nowYear - i}` }
    };
    this.dateControls[0].options.forEach((element) => {
      let weeks = this.dateUtil.getWeeksOfYear(parseInt(element.value));
      for (let i = 0; i < weeks.length; i++) {
        this.dateControls[1].options.push({ text: `第${i + 1}周(${this.datePipe.transform(weeks[i].firstDate, 'M.d')}-${this.datePipe.transform(weeks[i].lastDate, 'M.d')})`, value: `${i + 1}`, parentVal: `${element.value}` });
      }
    });
  }

  //跳到对应锚点
  goAnchor(id) {
    this.anchorFlag = id;
    if (document.getElementById(id)) {
      this.content.scrollTo(0, document.getElementById(id).offsetTop, 20);
    }
  }

  goCreate() {
    this.navCtrl.push(WorkWeektableCreatePage, {
      onUpdate:  this.goSpecWeektable.bind(this)
    });
  }

  goStatitics() {
    this.navCtrl.push(WorkWeektableStatisticsPage);
  }

  goWeektableShow(weektable) {
    this.navCtrl.push(WorkWeektableShowPage, {
      weektable: weektable,
      onUpdate: this.getWeektableList.bind(this)
    });
  }

  getWeektableList(weekdate = this.weekdate,week = 0) {
    let year = weekdate.split(" ")[0];
    let weeknum = weekdate.split(" ")[1];
    let params = {
      userCode: this.user.userCode,
      Year: year,
      weekNums: weeknum
    }
    this.workProvider.getWeektableList(params).subscribe(
      data => {
        this.weektableList = data;
        if(week){
          setTimeout(() => {
            this.goAnchor(week);
          }, 200);
        }
      }
    );
  }

  //根据日期计算出日期所在的年、周合并成字符串,譬如"2018 34"
  mergeYearAndWeek(date: Date) {
    let year = date.getFullYear();
    return year + " " + (this.dateUtil.getWeekOfDay(date).index + 1);
  }

  //根据日期跳到具体的年周显示周表列表
  goSpecWeektable(date: Date) {
    let week = date.getDay();
    week = week === 0?7:week;
    this.weekdate = this.mergeYearAndWeek(date);
    this.getWeektableList(this.weekdate,week);
  }

  updateList(flag) {
    // this.showOneFlag = false;
    if (!flag) {
      //选则日期的时候切换
      this.getWeektableList();
    } else {
      //上下周切换  flag=-1代表切换上周   1代表切换下周
      let updateDate = this.getNearWeek(flag);
      if (updateDate.getFullYear() <= this.nowYear) {
        let weekDateTemp = this.mergeYearAndWeek(updateDate);
        this.weekdate = weekDateTemp
        this.getWeektableList(weekDateTemp);
      }
    }
  }

  getNearWeek(flag) {
    let year = this.weekdate.split(" ")[0];
    let weeknum = this.weekdate.split(" ")[1];
    let weeks = this.dateUtil.getWeeksOfYear(parseInt(year));
    let tempDate = weeks[weeknum - 1].firstDate;
    let updateDate = new Date(tempDate.getTime() + flag * 7 * this.DAY_MILLISECOND);
    return updateDate;
  }

}
