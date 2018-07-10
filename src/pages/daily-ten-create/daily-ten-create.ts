import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DateUtilProvider } from '../../providers/date-util/date-util';
import { ImagePickerComponent } from '../../components/image-picker/image-picker';

@IonicPage()
@Component({
  selector: 'page-daily-ten-create',
  templateUrl: 'daily-ten-create.html',
})
export class DailyTenCreatePage {

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  year: number; // 当前年
  dailyTenForm: FormGroup;

  onCreate: () => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    public events: Events,
    public dateUtil: DateUtilProvider
  ) {
    this.year = this.navParams.get('year');
    this.onCreate = this.navParams.get('onCreate');
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
        this.navCtrl.pop();
        this.onCreate();
      }
    );
  }

  goDailyList() {
    this.navCtrl.push('DailyListRadioPage', {
      onDone: (daily) => {
        this.dailyTenForm.controls['content'].setValue(daily.content)
      }
    });
  }

}
