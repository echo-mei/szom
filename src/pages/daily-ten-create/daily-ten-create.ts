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
  selector: 'page-daily-ten-create',
  templateUrl: 'daily-ten-create.html',
})
export class DailyTenCreatePage {

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  user:any;
  maxLength: number = 196;
  ten = '每年十励';
  year: number; // 当前年
  dailyTenForm: FormGroup;
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
    this.year = this.navParams.get('year');
    this.onCreate = this.navParams.get('onCreate');
    this.user = this.navParams.get('user');
    this.count = this.navParams.get('count');
    this.dailyTenForm = formBuilder.group({
      // title: ['', Validators.compose([Validators.required])],
      content: ['', Validators.compose([Validators.required])]
    });
  }

  postDailyCreate(){
    let params = {
      ...this.dailyTenForm.value,
      year: this.year,
      startDateStr: this.dateUtil.format(new Date(this.year, 0, 1), 'yyyy-MM-dd'),
      endDateStr: this.dateUtil.format(new Date(this.year, 11, 31), 'yyyy-MM-dd')
    };
    let files;
    if(this.imagePicker.images.length) {
      files = this.imagePicker.images.map((img, files) => {
        return {'name': 'files', 'path': img.img};
      });
    }
    this.dailyProvider.createDailyTen(params, files).subscribe(
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
      writeThing: this.dailyTenForm.value['content'],
      user: this.user,
      witch: this.ten,
      minDate: new Date(this.year, 0, 1),
      maxDate: new Date(this.year, 11, 31),
      onDone: (daily) => {
        this.dailyTenForm.controls['content'].setValue(daily.content);
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
