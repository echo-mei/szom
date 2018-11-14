import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DicProvider } from '../../providers/dic/dic';
import { BzWeektableProvider } from '../../providers/bz-weektable/bz-weektable';
import { StorageProvider } from '../../providers/storage/storage';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';

@Component({
  selector: 'page-bz-work-weektable-update',
  templateUrl: 'bz-work-weektable-update.html',
})
export class BzWorkWeektableUpdatePage {

  // 用户
  user: any;
  weektable: any;

  onUpdate: (date) => {};

  form: FormGroup;

  maxLength = 196;

  timeColumns = [
    {
      name: 'time',
      options: []
    }
  ];

  userColums = [
    {
      name: 'person',
      options: []
    }
  ];

  typeColumns = [
    {
      name: 'type',
      options: []
    }
  ];
  // 最大时间
  timeMax = new Date().getFullYear() + 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dicProvider: DicProvider,
    public bzWeektableProvider: BzWeektableProvider,
    public storageProvider: StorageProvider,
    public dateUtilProvider: DateUtilProvider,
    public formBuilder: FormBuilder,
    public bzInfoProvider: BzInfoProvider
  ) {
    this.user = this.navParams.get('user');
    this.weektable = this.navParams.get('weektable');
    this.onUpdate = this.navParams.get('onUpdate');
    this.form = this.formBuilder.group({
      content: [this.weektable.content, Validators.compose([Validators.required])],
      workDateStr: [this.weektable.workDateStr, Validators.compose([Validators.required])],
      dayPeriod: [this.weektable.dayPeriod, Validators.compose([Validators.required])],
      userCode: [this.weektable.userCode, Validators.compose([Validators.required])],
      weektableTypeCode: [this.weektable.weektableTypeCode, Validators.compose([Validators.required])]
    });
    this.dicProvider.getDicItemList({ dicTypeCode: 'JDRS0900' }).subscribe(
      (list) => {
        this.timeColumns[0].options = list.map((item) => {
          return {
            text: item.displayName,
            value: item.dicItemCode
          };
        });
        this.form.controls['dayPeriod'].setValue(this.weektable.dayPeriod);
      }
    );
    this.dicProvider.getDicItemList({ dicTypeCode: 'JDRS0901' }).subscribe(
      (list) => {
        this.typeColumns[0].options = list.map((item) => {
          return {
            text: item.displayName,
            value: item.dicItemCode
          };
        });
        this.form.controls['weektableTypeCode'].setValue(this.weektable.weektableTypeCode);
      }
    );
    // 获取班子成员
    this.bzInfoProvider.getBzInfoMember({ unitId: this.user.unitId || this.user.orgId }).subscribe(
      (list) => {
        this.userColums[0].options = list.map((item) => {
          return {
            text: item.personName,
            value: item.userCode
          };
        });
        this.form.controls['userCode'].setValue(this.weektable.userCode);
      }
    );
  }

  saveWeektable() {
    let date = new Date(this.form.value.workDateStr);
    let params = {
      ...this.form.value,
      weektableId: this.weektable.weektableId,
      year: date.getFullYear(),
      week: date.getDay(),
      weekNums: this.dateUtilProvider.getWeekOfDay(date).index + 1,
    };
    this.bzWeektableProvider.updateWeektable(this.weektable.weektableId, params).subscribe(
      () => {
        this.navCtrl.pop();
        this.onUpdate && this.onUpdate(new Date(this.form.value.workDateStr));
      }
    );
  }

}
