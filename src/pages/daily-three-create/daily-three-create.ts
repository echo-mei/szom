import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DateUtilProvider } from '../../providers/date-util/date-util';
import { ImagePickerComponent } from '../../components/image-picker/image-picker';

@IonicPage()
@Component({
  selector: 'page-daily-three-create',
  templateUrl: 'daily-three-create.html',
})
export class DailyThreeCreatePage {

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  year: number; // 当前年
  quarter: {
    index?: number,
    quarter?: {
      firstDate: Date,
      lastDate: Date
    }
  } = {}; // 当前季
  dailyThreeForm: FormGroup;

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
    this.quarter = this.navParams.get('quarter');
    this.onCreate = this.navParams.get('onCreate');
    this.dailyThreeForm = formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
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
        this.navCtrl.pop();
        this.onCreate();
      }
    );
  }

  goDailyList() {
    this.navCtrl.push('DailyListRadioPage', {
      onDone: (daily) => {
        this.dailyThreeForm.controls['content'].setValue(daily.content)
      }
    });
  }

}
