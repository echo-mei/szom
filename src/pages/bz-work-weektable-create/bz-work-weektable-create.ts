import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DicProvider } from '../../providers/dic/dic';
import { BzWeektableProvider } from '../../providers/bz-weektable/bz-weektable';
import { StorageProvider } from '../../providers/storage/storage';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-bz-work-weektable-create',
  templateUrl: 'bz-work-weektable-create.html',
  providers: [
    DatePipe
  ]
})
export class BzWorkWeektableCreatePage {

  // 用户
  user: any;

  onCreate: (date) => {};

  form: FormGroup;
  // 最大时间
  maxLength: number = 196;

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
  // 当前选中的周几日期
  selectDate: Date;
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
    public datePipe: DatePipe,
    public storage: StorageProvider,
    public bzInfoProvider: BzInfoProvider
  ) {
    this.user = this.navParams.get('user');
    this.selectDate = this.navParams.get('selectDate');
    this.onCreate = this.navParams.get('onCreate');
    this.form = this.formBuilder.group({
      content: ['', Validators.compose([Validators.required, Validators.maxLength(this.maxLength)])],
      workDateStr: [this.datePipe.transform(this.selectDate, 'yyyy-MM-dd'), Validators.compose([Validators.required])],
      dayPeriod: ['', Validators.compose([Validators.required])],
      userCode: ['', Validators.compose([Validators.required])],
      weektableTypeCode: ['', Validators.compose([Validators.required])]
    });
    this.dicProvider.getDicItemList({ dicTypeCode: 'JDRS0900' }).subscribe(
      (list) => {
        this.timeColumns[0].options = list.map((item) => {
          return {
            text: item.displayName,
            value: item.dicItemCode
          };
        });
        this.form.controls['dayPeriod'].setValue(this.timeColumns[0].options[0].value);
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
        this.form.controls['weektableTypeCode'].setValue(this.typeColumns[0].options[0].value);
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
        })
        this.form.controls['userCode'].setValue(this.userColums[0].options[0].value);

      }
    );

  }


  saveWeektable() {
    let date = new Date(this.form.value.workDateStr);
    let params = {
      ...this.form.value,
      year: date.getFullYear(),
      week: date.getDay(),
      weekNums: this.dateUtilProvider.getWeekOfDay(date).index + 1,
    };
    this.bzWeektableProvider.createWeektable(params).subscribe(
      () => {
        this.navCtrl.pop();
        this.onCreate && this.onCreate(new Date(this.form.value.workDateStr));
      }
    );
  }

}
