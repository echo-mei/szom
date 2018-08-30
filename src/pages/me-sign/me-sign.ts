import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DayConfig } from 'ion2-calendar';

@Component({
  selector: 'page-me-sign',
  templateUrl: 'me-sign.html',
})
export class MeSignPage {

  calendarOptions = {
    monthFormat: 'YYYY年MM月',
    monthPickerFormat: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let _daysConfig: DayConfig[] = [];
    for (let i = 0; i < 31; i++) {
      _daysConfig.push({
        date: new Date(2018, 5, i + 1),
        subTitle: `$${i + 1}`
      })
    }
    this.calendarOptions['daysConfig'] = _daysConfig;
  }

}
