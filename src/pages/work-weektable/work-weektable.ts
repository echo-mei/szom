import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { WorkWeektableCreatePage } from '../work-weektable-create/work-weektable-create';
import { WorkProvider } from '../../providers/work/work';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { DatePipe } from '@angular/common';
import { WorkWeektableStatisticsPage } from '../work-weektable-statistics/work-weektable-statistics';
import { WorkWeektableShowPage } from '../work-weektable-show/work-weektable-show';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-work-weektable',
  templateUrl: 'work-weektable.html',
  providers: [
    DatePipe
  ]
})
export class WorkWeektablePage {
  @ViewChild('content') content: Content;

  // 用户
  @Input() user: any = {};
  // 当前用户
  me: any;
  // 一天毫秒数
  private DAY_MILLISECOND = 1 * 24 * 60 * 60 * 1000;
  // 工作周表列表
  weektableListAll: Array<Object> = [];
  weektableList: any[] = [
    { key: 1, name: '周一' },
    { key: 2, name: '周二' },
    { key: 3, name: '周三' },
    { key: 4, name: '周四' },
    { key: 5, name: '周五' },
    { key: 6, name: '周六' },
    { key: 7, name: '周日' }
  ];
  // 选中的周
  selectedWeekDay: number;
  // 星期名字：以星期开头
  weekName = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
  // 年份周数选择器时间字符串："年 周"   譬如："2018 37"
  weekdate: any;
  // 年份周数选择器选择栏
  dateControls: object = [
    {
      options: []
    },
    {
      options: []
    }
  ];
  //当前时间
  nowDate = new Date;
  // 当前年份
  nowYear = this.nowDate.getFullYear();
  // 最大年份：当前年份+1
  maxYear = this.nowYear + 1;
  // 当前定位的周几的日期
  selectDate: Date;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public workProvider: WorkProvider,
    public dateUtil: DateUtilProvider,
    public datePipe: DatePipe,
    public storage: StorageProvider
  ) {
    this.me = this.storage.me;
  }

  ngOnInit() {
    Object.assign(this, this.navParams.data);
  }

  ionViewDidLoad() {
    this.weekdate = this.mergeYearAndWeek(this.nowDate);
    this.getTime();
    this.getWeektableList();
  }

  // 获取工作周表数据
  getWeektableList(week = 0) {
    let year = this.weekdate.split(" ")[0];
    let weeknum = this.weekdate.split(" ")[1];
    let params = {
      userCode: this.user.userCode,
      year: year,
      weekNums: weeknum
    }
    this.workProvider.getWeektableList(params).subscribe(
      (list) => {
        this.weektableList = [
          { key: 1, name: '周一' },
          { key: 2, name: '周二' },
          { key: 3, name: '周三' },
          { key: 4, name: '周四' },
          { key: 5, name: '周五' },
          { key: 6, name: '周六' },
          { key: 7, name: '周日' }
        ];
        this.weektableListAll = list;
        list.forEach((item) => {
          let ws = this.weektableList.find((w) => {
            return w.key == item.week;
          });
          if (ws) {
            ws['children'] || (ws['children'] = []);
            ws['children'].push(item);
          }
        });

        if (!week) {
          let weekTemp = this.weektableList.find((w) => {
            return w.children && w.children.length > 0;
          });
          week = weekTemp?weekTemp.key:1;
        }
        setTimeout(() => {this.goWeekDay(week);}, 10);
      }
    );
  }

  //获取日期控件值
  getTime() {
    let startYear = 1900;

    for (let i = 0; i <= this.maxYear - startYear; i++) {
      this.dateControls[0].options[i] = { text: `${this.maxYear - i}年`, value: `${this.maxYear - i}` }
    };
    this.dateControls[0].options.forEach((element) => {
      let weeks = this.dateUtil.getWeeksOfYear(parseInt(element.value));
      for (let i = 0; i < weeks.length; i++) {
        this.dateControls[1].options.push({ text: `第${i + 1}周`, value: `${i + 1}`, parentVal: `${element.value}` });
        // this.dateControls[1].options.push({ text: `第${i + 1}周(${this.datePipe.transform(weeks[i].firstDate, 'M.d')}-${this.datePipe.transform(weeks[i].lastDate, 'M.d')})`, value: `${i + 1}`, parentVal: `${element.value}` });
      }
    });
  }

  //跳到对应周
  goWeekDay(key) {
    this.selectedWeekDay = key;
    this.calculationSelectDate();
    document.getElementById(key) && this.content.scrollTo(0, document.getElementById(key).offsetTop, 20);
  }

  // 计算当前选择周几的具体日期
  calculationSelectDate() {
    let year = this.weekdate.split(" ")[0];
    let weeknum = this.weekdate.split(" ")[1];
    let daySpace =  this.selectedWeekDay - 1;;
    this.selectDate = new Date(this.dateUtil.getOneWeek(year, weeknum - 1).firstDate.getTime() + daySpace * this.dateUtil.DAY_MILLISECOND);
  }

  //根据日期计算出日期所在的年、周合并成字符串,譬如"2018 34"
  mergeYearAndWeek(date: Date) {
    let year = date.getFullYear();
    return year + " " + (this.dateUtil.getWeekOfDay(date).index + 1);
  }

  //根据日期跳到具体的年周显示周表列表
  goSpecWeektable(date: Date) {
    let week = date.getDay();
    week = week === 0 ? 7 : week;
    this.weekdate = this.mergeYearAndWeek(date);
    this.getWeektableList(week);
  }

  goWeektableShow(weektable) {
    this.navCtrl.push(WorkWeektableShowPage, {
      user: this.user,
      weektable: weektable,
      onUpdate: this.goSpecWeektable.bind(this),
      onDelete: this.getWeektableList.bind(this)
    });
  }

  goCreate() {
    this.navCtrl.push(WorkWeektableCreatePage, {
      selectDate: this.selectDate,
      onUpdate: this.goSpecWeektable.bind(this)
    });
  }

  goStatitics() {
    this.navCtrl.push(WorkWeektableStatisticsPage, {
      user: this.user
    });
  }

  updateList(flag) {
    if (!flag) {
      //选则日期的时候切换
      this.getWeektableList();
    } else {
      //上下周切换  flag=-1代表切换上周   1代表切换下周
      let updateDate = this.getNearWeek(flag);
      if (updateDate.getFullYear() <= this.maxYear) {
        this.weekdate = this.mergeYearAndWeek(updateDate);
        this.getWeektableList();
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
