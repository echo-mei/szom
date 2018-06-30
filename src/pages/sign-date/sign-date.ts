import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DayConfig, CalendarComponent } from 'ion2-calendar';
import { SignProvider } from '../../providers/sign/sign';
import { CalendarService } from 'ion2-calendar/dist/services/calendar.service';

@IonicPage()
@Component({
  selector: 'page-sign-date',
  templateUrl: 'sign-date.html',
})
export class SignDatePage {

  @ViewChild('calendar') calendar: CalendarComponent;

  calendarOptions = {
    monthFormat: 'YYYY年MM月',
    monthPickerFormat: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    daysConfig: []
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public signProvider: SignProvider,
    public calendarService: CalendarService,
  ) {
    this.getDaysInfo();
  }

  getDaysInfo(event?) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    if(event) {
      year = event.newMonth.years;
      month = event.newMonth.months;
    }
    let _daysConfig: DayConfig[] = [];
    let params = {
      year: year,
      month: month
    };
    this.signProvider.signInList(params).subscribe(
      data => {
        data.forEach((sign) => {
          _daysConfig.push({
            date: new Date(sign.signInDate),
            subTitle: sign.signInType
          });
        });
        this.calendarOptions = {
          ...this.calendarOptions,
          daysConfig: _daysConfig
        };
      }
    );
  }

}
