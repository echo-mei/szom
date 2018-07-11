import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { DayConfig, CalendarComponent } from 'ion2-calendar';
import { SignProvider } from '../../providers/sign/sign';
import { CalendarService } from 'ion2-calendar/dist/services/calendar.service';
import { DateUtilProvider } from '../../providers/date-util/date-util';

@IonicPage()
@Component({
  selector: 'page-sign-date',
  templateUrl: 'sign-date.html',
})
export class SignDatePage {

  @ViewChild('calendar') calendar: CalendarComponent;

  month: any;

  calendarOptions = {
    monthFormat: 'YYYY年MM月',
    showMonthPicker: false,
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthPickerFormat: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    daysConfig: []
  };

  tags: any[] = [];

  onSign: () => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public signProvider: SignProvider,
    public calendarService: CalendarService,
    public dateUtil: DateUtilProvider,
    public popoverCtrl: PopoverController
  ) {
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
      month: this.month
    };
    this.signProvider.signInList(params).subscribe(
      data => {
        if(data){
          for(let key in data) {
            _daysConfig.push({
              date: new Date(key),
              subTitle: data[key].dicItemName
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
      month: this.month
    };
    this.signProvider.signInCount(params).subscribe(
      (tags) => {
        this.tags = tags;
      }
    );
  }

  goSign(event) {
    if(this.dateUtil.isSameDay(new Date(), new Date(event.time))) {
      let popover = this.popoverCtrl.create('SignTagsPage', {
        onSign: () => {
          this.onSign && this.onSign();
          this.goMonth();
        }
      }, {
        cssClass: 'auto'
      });
      popover.present();
    }
  }

}
