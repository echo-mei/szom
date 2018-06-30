import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { CalendarModalOptions, CalendarModal } from 'ion2-calendar';

@IonicPage()
@Component({
  selector: 'page-dynamic-search',
  templateUrl: 'dynamic-search.html',
})
export class DynamicSearchPage {

  constructor(
    public modalCtrl: ModalController
  ) {
  }

  openCalendar() {
    const options: CalendarModalOptions = {
      title: '选择日期',
      pickMode: 'range',
      closeLabel: '取消',
      doneLabel: '确定',
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      monthFormat: 'YYYY年MM月'
    };
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss(date => {
      console.log(date);
    })
  }

}
