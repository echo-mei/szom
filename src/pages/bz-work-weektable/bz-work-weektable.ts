import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BzWorkWeektableCreatePage } from '../bz-work-weektable-create/bz-work-weektable-create';
import { BzWorkWeektableStatisticPage } from '../bz-work-weektable-statistic/bz-work-weektable-statistic';
import { BzWeektableProvider } from '../../providers/bz-weektable/bz-weektable';
import { DateUtilProvider } from '../../providers/date-util/date-util';

@Component({
  selector: 'page-bz-work-weektable',
  templateUrl: 'bz-work-weektable.html',
})
export class BzWorkWeektablePage {

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

  weektableList: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bzWeektableProvider: BzWeektableProvider,
    public dateUtil: DateUtilProvider
  ) {
    this.getTimeColumns();
    let now = new Date();
    this.week = `${now.getFullYear()} ${this.dateUtil.getWeekOfDay(now).index+1}`;
    this.listWeektable();
  }

  listWeektable() {
    this.bzWeektableProvider.listWeektable({year: this.week.split(' ')[0], weekNums: this.week.split(' ')[1]}).subscribe(
      (list) => {
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
          if(ws) {
            ws['children'] || (ws['children'] = []);
            ws['children'].push(item);
          }
        });
      }
    );
  }

  getTimeColumns() {
    let startYear = 1900;
    let date, year;
    date = new Date;
    year = date.getFullYear();
    for (let i = 0; i <= year - startYear; i++) {
      this.timeColumns[0].options[i] = { text: `${year - i}年`, value: `${year - i}` }
    };
    this.timeColumns[0].options.forEach((element) => {
      year = this.dateUtil.getWeeksOfYear(parseInt(element.value)).length;
      for (let i = 1; i <= year; i++) {
        this.timeColumns[1].options.push({ text: `第${i}周`, value: `${i}`, parentVal: `${element.value}` });
      }
    });
  }

  goWeekDay(index) {
    this.selectedWeekDay = index;
  }

  prevWeek() {
    const week = this.week.split(' ');
    if(week[1] == 1) {
      this.week = `${Number(week[0])-1} ${this.dateUtil.getWeeksOfYear(week[0]).length}`;
    }else {
      this.week = `${week[0]} ${Number(week[1])-1}`;
    }
    this.listWeektable();
  }

  nextWeek() {
    const week = this.week.split(' ');
    if(week[1] == this.dateUtil.getWeeksOfYear(week[0]).length) {
      this.week = `${Number(week[0])+1} 1`;
    }else {
      this.week = `${week[0]} ${Number(week[1])+1}`;
    }
    this.listWeektable();
  }

  goBzWorkWeektable() {
    this.navCtrl.push(BzWorkWeektableCreatePage);
  }

  goBzWorkWeektableStatistic() {
    this.navCtrl.push(BzWorkWeektableStatisticPage);
  }

}
