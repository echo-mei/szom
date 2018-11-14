import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, PickerController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { WorkProvider } from '../../providers/work/work';
import { StorageProvider } from '../../providers/storage/storage';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { DatePipe } from '@angular/common';
import { DicProvider } from '../../providers/dic/dic';

@Component({
  selector: 'page-work-weektable-update',
  templateUrl: 'work-weektable-update.html',
  providers: [
    DatePipe
  ]
})
export class WorkWeektableUpdatePage {
  weektableForm: FormGroup;

  //当前用户
  me: any;
  //时间
  workDateStr: any;
  // 时间限制年份选择可以比当前时间大一年
  timeMax=(new Date()).getFullYear()+1;
  //时间段
  dayPeriod: any;
  //时间段选择栏
  dayPeriodControls: object = [
    {
      options: []
    }
  ]
  //周表类型id
  weektableTypeId: any = "2";
  //周表类型选择栏
  weektableTypeControls: object = [
    {
      options: []
    }
  ]
  //周表内容
  content: string;
  //内容最大长度限制
  maxLength = 196;

  weektable:any;
  onUpdate: (data:Date) => {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public workProvider: WorkProvider,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public dateUtil: DateUtilProvider,
    public datePipe: DatePipe,
    public storage: StorageProvider,
    public picker: PickerController,
    public dicProvider: DicProvider) {
    this.me = this.storage.me;
    this.weektable = this.navParams.get("weektable");
    this.onUpdate = this.navParams.get('onUpdate');
    this.weektableForm = this.formBuilder.group({
      content: [this.weektable.content, Validators.compose([Validators.required,Validators.maxLength(this.maxLength)])],
      workDateStr: [this.datePipe.transform(this.weektable.workDateStr, 'yyyy-MM-dd'), Validators.compose([Validators.required])],
      dayPeriod: [this.weektable.dayPeriod, Validators.compose([Validators.required])],
      weektableTypeCode: [this.weektable.weektableTypeCode.toString(), Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    this.dicProvider.getDicItemList({dicTypeCode: 'JDRS0900'}).subscribe(
      (list) => {
        this.dayPeriodControls[0].options = list.map((item) => {
          return {
            text: item.displayName,
            value: item.dicItemCode
          };
        });
        this.weektableForm.controls['dayPeriod'].setValue(this.weektable.dayPeriod);
      }
    );
    this.dicProvider.getDicItemList({dicTypeCode: 'JDRS0901'}).subscribe(
      (list) => {
        this.weektableTypeControls[0].options = list.map((item) => {
          return {
            text: item.displayName,
            value: item.dicItemCode
          };
        });
        this.weektableForm.controls['weektableTypeCode'].setValue(this.weektable.weektableTypeCode);
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
    this.workProvider.updateWeektable(this.weektable.weektableId,params).subscribe(
      () => {
        this.toastCtrl.create({
          cssClass: 'mini',
          position: 'middle',
          message: '修改成功',
          duration: 1000
        }).present();
        this.onUpdate && this.onUpdate(new Date(this.weektableForm.value.workDateStr));
        this.navCtrl.pop();
      }
    );
  }

}
