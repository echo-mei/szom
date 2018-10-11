import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';
import { DayConfig, CalendarComponent, CalendarComponentOptions } from 'ion2-calendar';
import { SignProvider } from '../../providers/sign/sign';
import { CalendarService } from 'ion2-calendar/dist/services/calendar.service';
import { DateUtilProvider } from '../../providers/date-util/date-util';

@Component({
  selector: 'page-sign-date',
  templateUrl: 'sign-date.html',
})
export class SignDatePage {

  @ViewChild('calendar') calendar: CalendarComponent;

  user:any;
  month: any;

  calendarOptions : CalendarComponentOptions = {
    monthFormat: 'YYYY年MM月',
    showMonthPicker: false,
    monthPickerFormat: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    daysConfig: [],
    from: new Date(1991, 0, 1)
  };

  tags: any[] = [];

  onSign: () => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public signProvider: SignProvider,
    public calendarService: CalendarService,
    public dateUtil: DateUtilProvider,
    public popoverCtrl: PopoverController,
    public viewCtrl: ViewController
  ) {
    this.user = this.navParams.get('user');
    this.onSign = this.navParams.get('onSign');
    this.goMonth();
  }

  goMonth(event?) {
    this.month = this.dateUtil.format(event ? new Date(event.newMonth.dateObj) : new Date(), 'yyyy-MM');
    this.getDaysInfo();
    this.getTags();
  }

  getDaysInfo() {
    let _daysConfig: DayConfig[] = [];
    let params = {
      userCode:this.user.userCode,
      month: this.month
    };
    this.signProvider.signInList(params).subscribe(
      data => {
        if(data){
          for(let key in data) {
            _daysConfig.push({
              date: new Date(key),
              subTitle: data[key].signInTypeName,
              cssClass: 'sign-date-'+data[key].signInType
            });
          }
        };
        this.calendarOptions = {
          ...this.calendarOptions,
          daysConfig: _daysConfig
        };
      }
    );
  }

  getTags() {
    let params = {
      userCode:this.user.userCode,
      month: this.month
    };
    this.tags = [];
    this.signProvider.signInCount(params).subscribe(
      (tags) => {
        this.tags = tags;
      }
    );
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
