import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CalendarComponent, CalendarComponentOptions, DayConfig } from 'ion2-calendar';
import { SignProvider } from '../../providers/sign/sign';
import { CalendarService } from 'ion2-calendar/dist/services/calendar.service';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the UserSignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-sign',
  templateUrl: 'user-sign.html',
})
export class UserSignPage {
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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public signProvider: SignProvider,
    public calendarService: CalendarService,
    public dateUtil: DateUtilProvider,
    public statusBar: StatusBar
  ) {
    this.user = this.navParams.get("user");
    this.goMonth();
  }

  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  ionViewWillLeave() {
    this.statusBar.styleDefault();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSignPage');
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

}
