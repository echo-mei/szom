import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DicProvider } from '../../providers/dic/dic';
import { BzWeektableProvider } from '../../providers/bz-weektable/bz-weektable';
import { StorageProvider } from '../../providers/storage/storage';
import { DateUtilProvider } from '../../providers/date-util/date-util';

@Component({
  selector: 'page-bz-work-weektable-create',
  templateUrl: 'bz-work-weektable-create.html',
})
export class BzWorkWeektableCreatePage {

  timeColumns = [
    {
      name: 'time',
      options: []
    }
  ];

  typeColumns = [
    {
      name: 'type',
      options: []
    }
  ];

  weektable: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dicProvider: DicProvider,
    public bzWeektableProvider: BzWeektableProvider,
    public storageProvider: StorageProvider,
    public dateUtilProvider: DateUtilProvider
  ) {
    this.dicProvider.getDicItemList({dicTypeCode: 'JDRS0900'}).subscribe(
      (list) => {
        this.timeColumns[0].options = list.map((item) => {
          return {
            text: item.displayName,
            value: item.dicItemCode
          };
        });
      }
    );
    this.bzWeektableProvider.findUpWeektableType().subscribe(
      (list) => {
        this.typeColumns[0].options = list.map((item) => {
          return {
            text: item.typeName,
            value: item.weektableTypeId
          };
        });
      }
    );
  }

  saveWeektable() {
    let date = new Date(this.weektable.date);
    let params = {
      userCode:  JSON.parse(this.storageProvider.get('user')).userCode,
      content: this.weektable.content,
      year: date.getFullYear(),
      week: date.getDay(),
      weekNums: this.dateUtilProvider.getWeekOfDay(date).index,
      dayPeriod: this.weektable.dayPeriod,
      workDateStr: this.dateUtilProvider.format(date, 'yyyy-MM-dd'),
      weektableTypeId: this.weektable.weektableTypeId
    };
    this.bzWeektableProvider.createWeektable(params).subscribe(
      () => {

      }
    );
  }

}
