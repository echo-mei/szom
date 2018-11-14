import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { BzWorkWeektableCreatePage } from '../bz-work-weektable-create/bz-work-weektable-create';
import { BzWorkWeektableStatisticPage } from '../bz-work-weektable-statistic/bz-work-weektable-statistic';
import { BzWeektableProvider } from '../../providers/bz-weektable/bz-weektable';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { BzWorkWeektableShowPage } from '../bz-work-weektable-show/bz-work-weektable-show';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-bz-work-weektable',
  templateUrl: 'bz-work-weektable.html',
})
export class BzWorkWeektablePage {

  @ViewChild('content') content: Content;

  // 用户
  user: any;
  // 当前用户
  me: any;
  // 星期名字：以星期开头
  weekName = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
  // 年份周数选择器选择栏
  timeColumns: any[] = [
    {
      options: []
    },
    {
      options: []
    }
  ];
  week: any;
  weekDays: any[] = [
    { key: 1, name: '周一' },
    { key: 2, name: '周二' },
    { key: 3, name: '周三' },
    { key: 4, name: '周四' },
    { key: 5, name: '周五' },
    { key: 6, name: '周六' },
    { key: 0, name: '周日' }
  ];
  selectedWeekDay: number = 1;
  weektableListAll: Array<Object> = [];
  weektableList: any[] = [];
  // 当前定位的周几的日期
  selectDate: Date;
  // 最大年份：当前年份+1
  maxYear = new Date().getFullYear() + 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bzWeektableProvider: BzWeektableProvider,
    public dateUtil: DateUtilProvider,
    public storage: StorageProvider
  ) {
    this.user = this.navParams.get('user');
    this.me = this.storage.me;
    this.getTimeColumns();
    let now = new Date();
    this.week = `${now.getFullYear()} ${this.dateUtil.getWeekOfDay(now).index + 1}`;
    this.listWeektable();
  }

  listWeektable(day?) {
    let params = {
      year: this.week.split(' ')[0],
      weekNums: this.week.split(' ')[1],
      unitId: this.user.unitId || this.user.orgId
    }
    this.bzWeektableProvider.listWeektable(params).subscribe(
      (list) => {
        this.weektableListAll = list;
        this.weektableList = [
          { key: 1, name: '周一' },
          { key: 2, name: '周二' },
          { key: 3, name: '周三' },
          { key: 4, name: '周四' },
          { key: 5, name: '周五' },
          { key: 6, name: '周六' },
          { key: 0, name: '周日' }
        ];
        list.forEach((item) => {
          let ws = this.weektableList.find((w) => {
            return w.key == item.week;
          });
          if (ws) {
            ws['children'] || (ws['children'] = []);
            ws['children'].push(item);
          }
        });
        if (day===undefined) {
          let weekTemp = this.weektableList.find((w) => {
            return w.children && w.children.length > 0;
          });
          day = weekTemp ? weekTemp.key : 1;
        }
        setTimeout(() => { this.goWeekDay(day); }, 10);
      }
    );
  }
  // 计算当前选择周几的具体日期
  calculationSelectDate() {
    let year = this.week.split(" ")[0];
    let weeknum = this.week.split(" ")[1];
    let daySpace = this.selectedWeekDay ? (this.selectedWeekDay - 1) : 6;
    this.selectDate = new Date(this.dateUtil.getOneWeek(year, weeknum - 1).firstDate.getTime() + daySpace * this.dateUtil.DAY_MILLISECOND);
  }

  //根据日期计算出日期所在的年、周合并成字符串,譬如"2018 34"
  mergeYearAndWeek(date: Date) {
    let year = date.getFullYear();
    return year + " " + (this.dateUtil.getWeekOfDay(date).index + 1);
  }

  //根据日期跳到具体的年周显示周表列表
  showSpecWeektable(date: Date) {
    let day = date.getDay();
    this.week = this.mergeYearAndWeek(date);
    this.listWeektable(day);
  }

  getTimeColumns() {
    let startYear = 1900;
    let date, year;
    for (let i = 0; i <= this.maxYear - startYear; i++) {
      this.timeColumns[0].options[i] = { text: `${this.maxYear - i}年`, value: `${this.maxYear - i}` }
    };
    this.timeColumns[0].options.forEach((element) => {
      year = this.dateUtil.getWeeksOfYear(parseInt(element.value)).length;
      for (let i = 1; i <= year; i++) {
        this.timeColumns[1].options.push({ text: `第${i}周`, value: `${i}`, parentVal: `${element.value}` });
      }
    });
  }

  goWeekDay(key) {
    this.selectedWeekDay = key;
    this.calculationSelectDate();
    document.getElementById(key) && this.content.scrollTo(0, document.getElementById(key).offsetTop, 20);
  }

  prevWeek() {
    const week = this.week.split(' ');
    if (week[1] == 1) {
      this.week = `${Number(week[0]) - 1} ${this.dateUtil.getWeeksOfYear(week[0]).length}`;
    } else {
      this.week = `${week[0]} ${Number(week[1]) - 1}`;
    }
    this.listWeektable();
  }

  nextWeek() {
    const week = this.week.split(' ');
    if(week[1] == this.dateUtil.getWeeksOfYear(this.maxYear).length){
      // 已经到了最大日期限制
      return ;
    }
    if (week[1] == this.dateUtil.getWeeksOfYear(week[0]).length) {
      this.week = `${Number(week[0]) + 1} 1`;
    } else {
      this.week = `${week[0]} ${Number(week[1]) + 1}`;
    }
    this.listWeektable();
  }

  goBzWorkWeektable() {
    this.navCtrl.push(BzWorkWeektableCreatePage, {
      user: this.user,
      selectDate: this.selectDate,
      onCreate: this.showSpecWeektable.bind(this)
    });
  }

  goBzWorkWeektableStatistic() {
    this.navCtrl.push(BzWorkWeektableStatisticPage, {
      user: this.user
    });
  }

  changeDate() {
    this.listWeektable();
  }

  goWeektableShow(weektable) {
    this.navCtrl.push(BzWorkWeektableShowPage, {
      user: this.user,
      weektable: weektable,
      onUpdate: this.showSpecWeektable.bind(this),
      onDelete: this.listWeektable.bind(this)
    });
  }

}
