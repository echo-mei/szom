import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams, AlertController, Events, ToastController } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DateUtilProvider } from '../../providers/date-util/date-util';
import { ImagePickerComponent } from '../../components/image-picker/image-picker';
import { DailyListRadioPage } from '../daily-list-radio/daily-list-radio';

import { BASE_URL } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-daily-one-create',
  templateUrl: 'daily-one-create.html',
})
export class DailyOneCreatePage {

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;
  user:any;
  one = '每周一励';
  maxLength: number = 196;

  week: {
    year?: number,
    index?: number,
    week?: {
      firstDate: Date,
      lastDate: Date
    }
  } = {};  // 当前周
  dailyOneForm: FormGroup;
  count: any;
  onCreate: ()=>{};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    public events: Events,
    public dateUtil: DateUtilProvider,
    public toastCtrl: ToastController,
    public storage: StorageProvider
  ) {
    this.week = this.navParams.get('week');
    this.user = this.navParams.get('user');
    this.onCreate = this.navParams.get('onCreate');
    this.count = this.navParams.get('count');
    this.dailyOneForm = formBuilder.group({
      content: ['', Validators.compose([Validators.required])]
    });
  }

  postDailyCreate(){
    let params = {
      ...this.dailyOneForm.value,
      year: this.week.year,
      weekNums: this.week.index + 1,
      startDateStr: this.dateUtil.format(this.week.week.firstDate, 'yyyy-MM-dd'),
      endDateStr: this.dateUtil.format(this.week.week.lastDate, 'yyyy-MM-dd')
    };
    let files;
    if(this.imagePicker.images.length) {
      files = this.imagePicker.images.map((img) => {
        return {'name': 'files', 'path': img.img};
      });
    }
    this.dailyProvider.createDailyOne(params, files).subscribe(
      () => {
        this.toastCtrl.create({
          cssClass: 'mini',
          position: 'middle',
          message: '发布成功',
          duration: 1000
        }).present();
        this.navCtrl.pop();
        this.onCreate && this.onCreate();
      }
    );
  }

  goDailyList() {
    this.navCtrl.push(DailyListRadioPage, {
      writeThing: this.dailyOneForm.value['content'],
      user: this.user,
      witch: this.one,
      minDate: this.week.week.firstDate,
      maxDate: this.week.week.lastDate,
      onDone: (daily) => {
        this.dailyOneForm.controls['content'].setValue(daily.content);
        this.imagePicker.images = [];
        daily.uploadFileDetailDTOList && daily.uploadFileDetailDTOList.forEach((img) => {
          this.imagePicker.images.push({
            img: `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`,
            safeUrl: `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`
          });
        });
      }
    });

  }

}
