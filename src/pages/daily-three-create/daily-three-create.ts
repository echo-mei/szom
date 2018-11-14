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
  selector: 'page-daily-three-create',
  templateUrl: 'daily-three-create.html',
})
export class DailyThreeCreatePage {

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;
  user: any;
  maxLength: number = 196;
  three = '每季三励';
  year: number; // 当前年
  quarter: {
    year?: number,
    index?: number,
    quarter?: {
      firstDate: Date,
      lastDate: Date
    }
  } = {}; // 当前季
  dailyThreeForm: FormGroup;
  count: any;
  onCreate: () => {};

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
    this.user = this.navParams.get('user');
    this.year = this.navParams.get('year');
    this.quarter = this.navParams.get('quarter');
    this.onCreate = this.navParams.get('onCreate');
    this.count = this.navParams.get('count');
    this.dailyThreeForm = formBuilder.group({
      // title: ['', Validators.compose([Validators.required])],
      content: ['', Validators.compose([Validators.required])]
    });
  }

  postDailyCreate(){
    let params = {
      ...this.dailyThreeForm.value,
      year: this.year,
      quarterNums: this.quarter.index,
      startDateStr: this.dateUtil.format(this.quarter.quarter.firstDate, 'yyyy-MM-dd'),
      endDateStr: this.dateUtil.format(this.quarter.quarter.lastDate, 'yyyy-MM-dd')
    };
    let files;
    if(this.imagePicker.images.length) {
      files = this.imagePicker.images.map((img, files) => {
        return {'name': 'files', 'path': img.img};
      });
    }
    this.dailyProvider.createDailyThree(params, files).subscribe(
      () => {
        this.toastCtrl.create({
          cssClass: 'mini',
          position: 'middle',
          message: '发布成功',
          duration: 1000
        }).present();
        this.navCtrl.pop();
        this.onCreate();
      }
    );
  }

  goDailyList() {
    this.navCtrl.push(DailyListRadioPage, {
      writeThing: this.dailyThreeForm.value['content'],
      user: this.user,
      witch: this.three,
      minDate: this.quarter.quarter.firstDate,
      maxDate: this.quarter.quarter.lastDate,
      onDone: (daily) => {
        this.dailyThreeForm.controls['content'].setValue(daily.content);
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
