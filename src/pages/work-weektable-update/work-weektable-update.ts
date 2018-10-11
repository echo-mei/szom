import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, PickerController } from 'ionic-angular';
import { TypeCustomPage } from '../type-custom/type-custom';
import { FormGroup, FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { WorkProvider } from '../../providers/work/work';
import { StorageProvider } from '../../providers/storage/storage';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the WorkWeektableUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-work-weektable-update',
  templateUrl: 'work-weektable-update.html',
  providers: [
    DatePipe
  ]
})
export class WorkWeektableUpdatePage {
  weektableForm: FormGroup;

  workDateStr: any;
  dayPeriod: any;
  dayPeriodControls: object = [
    {
      options: [
        { text: "全天", value: "4" },
        { text: "上午", value: "1" },
        { text: "下午", value: "2" },
        { text: "晚上", value: "3" }
      ]
    }
  ]
  weektableTypeId: any = "2";
  weektableTypeControls: object = [
    {
      options: []
    }
  ]
  content: string;
  maxLength = 196;
  me: any;

  weektable:any;
  onUpdate: () => {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public workProvider: WorkProvider,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public dateUtil: DateUtilProvider,
    public datePipe: DatePipe,
    public storage: StorageProvider,
    public picker: PickerController) {
    this.me = JSON.parse(this.storage.get('user'));
    this.weektable = this.navParams.get("weektable");
    this.onUpdate = this.navParams.get('onUpdate');
    this.weektableForm = this.formBuilder.group({
      content: [this.weektable.content, Validators.compose([Validators.required])],
      workDateStr: [this.datePipe.transform(this.weektable.workDateStr, 'yyyy-MM-dd'), Validators.compose([Validators.required])],
      dayPeriod: [this.weektable.dayPeriod, Validators.compose([Validators.required])],
      weektableTypeCode: [this.weektable.weektableTypeCode.toString(), Validators.compose([Validators.required])]
    });
    this.getWeektableType();
  }

  ionViewDidLoad() {
  }

  getWeektableType() {
    this.workProvider.getWeektableType().subscribe(
      (data) => {
        this.weektableTypeControls[0].options = [];
        data.forEach(element => {
          this.weektableTypeControls[0].options.push({ text: element.typeName, value: element.weektableTypeId })
        });
        this.weektableTypeControls[0].options.push({text:"自定义",value:"0"});
        this.weektableForm.controls['weektableTypeCode'].setValue(this.weektable.weektableTypeCode);
      }
    )
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
        this.onUpdate && this.onUpdate();
        this.navCtrl.pop();
      }
    );
  }

  goTypeCustom() {
    let weektableTypeId = this.weektableForm.value.weektableTypeId;
    if(weektableTypeId === "0"){
      this.weektableForm.controls['weektableTypeId'].setValue("1");
      this.navCtrl.push(TypeCustomPage, {
        onUpdateWeektableTypeList: this.getWeektableType.bind(this)
      });
    }
  }
}
