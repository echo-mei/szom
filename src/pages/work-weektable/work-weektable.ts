import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { WorkWeektableCreatePage } from '../work-weektable-create/work-weektable-create';
import { WorkProvider } from '../../providers/work/work';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { DatePipe } from '@angular/common';
import { WorkWeektableStatisticsPage } from '../work-weektable-statistics/work-weektable-statistics';

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

  // 一天毫秒数
  private DAY_MILLISECOND = 1 * 24 * 60 * 60 * 1000;

  showOneFlag=true;
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
  tempDate = this.nowDate;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public workProvider: WorkProvider,
    public dateUtil: DateUtilProvider,
    public datePipe: DatePipe) {
  }

  ionViewDidLoad() {
    this.weekdate = this.mergeYearAndWeek(this.nowDate);
    this.getTime();
    this.getWeektableList();
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
    if(document.getElementById(id)) {
      this.content.scrollTo(0, document.getElementById(id).offsetTop, 20);
    }
  }

  goCreate() {
    this.navCtrl.push(WorkWeektableCreatePage, {
      onUpdateWeektableList: this.getWeektableList.bind(this)
    });
  }

  goStatitics() {
    this.navCtrl.push(WorkWeektableStatisticsPage, {
      onUpdateWeektableList: this.getWeektableList.bind(this)
    });
  }

  getWeektableList(weekdate=this.weekdate) {
    let year =  weekdate.split(" ")[0];
    let weeknum = weekdate.split(" ")[1];
    let params = {
      Year:year,
      weekNums: weeknum
    }
    this.workProvider.getWeektableList(params).subscribe(
      data => {
        this.weektableList = data;
      }
    );
  }

  //根据日期计算出日期所在的年、周合并成字符串,譬如"2018 34"
  mergeYearAndWeek(date: Date) {
    let year = date.getFullYear();
    return year + " " + (this.dateUtil.getWeekOfDay(date).index + 1);
  }

  updateList(flag) {
    this.showOneFlag = false;
    if(!flag){
      let year = this.weekdate.split(" ")[0];
      let weeknum = this.weekdate.split(" ")[1];
      let weeks = this.dateUtil.getWeeksOfYear(parseInt(year));
      this.tempDate = weeks[weeknum-1].firstDate;
      this.getWeektableList();
    }else{
      let updateDate = new Date(this.tempDate.getTime() + flag * 7 * this.DAY_MILLISECOND);
      if (updateDate.getFullYear() <= this.nowYear) {
        let weekDateTemp = this.mergeYearAndWeek(updateDate);
        this.tempDate = updateDate;
        this.weekdate = weekDateTemp
        this.getWeektableList(weekDateTemp);
      }
    }

  }

}
