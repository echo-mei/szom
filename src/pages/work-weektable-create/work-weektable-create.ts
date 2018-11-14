import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, PickerController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { WorkProvider } from '../../providers/work/work';
import { StorageProvider } from '../../providers/storage/storage';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { DicProvider } from '../../providers/dic/dic';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-work-weektable-create',
  templateUrl: 'work-weektable-create.html',
  providers: [
    DatePipe
  ]
})
export class WorkWeektableCreatePage {
  weektableForm: FormGroup;

  // 我
  me: any;
  // 工作周表时间
  workDateStr: Date;
  // 工作周表时间段范围:晚上、上午、下午、全天
  dayPeriod: any;
  dayPeriodControls: object = [
    {
      options: []
    }
  ]
  // 工作周表类型
  weektableTypeCode: any;
  weektableTypeControls: object = [
    {
      options: []
    }
  ]
  // 工作周表内容
  content: string;
  // 内容最大输入字数限制
  maxLength: number = 196;
  // 最大时间
  timeMax = new Date().getFullYear() + 1;
  // 当前选中的周几日期
  selectDate: Date;

  onUpdate: (date) => {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public workProvider: WorkProvider,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public dateUtil: DateUtilProvider,
    public storage: StorageProvider,
    public dicProvider: DicProvider,
    public datePipe: DatePipe
  ) {
    this.me = this.storage.me;
    this.selectDate = this.navParams.get('selectDate');
    this.onUpdate = this.navParams.get('onUpdate');
    this.weektableForm = this.formBuilder.group({
      content: ['', Validators.compose([Validators.required, Validators.maxLength(this.maxLength)])],
      workDateStr: [this.datePipe.transform(this.selectDate, 'yyyy-MM-dd'), Validators.compose([Validators.required])],
      dayPeriod: ['', Validators.compose([Validators.required])],
      weektableTypeCode: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    this.dicProvider.getDicItemList({ dicTypeCode: 'JDRS0900' }).subscribe(
      (list) => {
        this.dayPeriodControls[0].options = list.map((item) => {
          return {
            text: item.displayName,
            value: item.dicItemCode
          };
        });
        this.weektableForm.controls['dayPeriod'].setValue(this.dayPeriodControls[0].options[0].value);
      }
    );
    this.dicProvider.getDicItemList({ dicTypeCode: 'JDRS0901' }).subscribe(
      (list) => {
        this.weektableTypeControls[0].options = list.map((item) => {
          return {
            text: item.displayName,
            value: item.dicItemCode
          };
        });
        this.weektableForm.controls['weektableTypeCode'].setValue(this.weektableTypeControls[0].options[0].value);
      }
    );
  }

  postWeektableCreate() {
    let date = new Date(this.weektableForm.value.workDateStr);
    let year = date.getFullYear();
    let week = date.getDay();
    let weekNums = this.dateUtil.getWeekOfDay(date).index + 1;
    let params = {
      ...this.weektableForm.value,
      userCode: this.me.userCode,
      year: year,
      week: week === 0 ? 7 : week,
      weekNums: weekNums
    };
    this.workProvider.createWeektable(params).subscribe(
      () => {
        this.toastCtrl.create({
          cssClass: 'mini',
          position: 'middle',
          message: '发布成功',
          duration: 1000
        }).present();
        this.onUpdate && this.onUpdate(new Date(this.weektableForm.value.workDateStr));
        this.navCtrl.pop();
      }
    );
  }

}
