import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DateUtilProvider } from '../../providers/date-util/date-util';
import { ImagePickerComponent } from '../../components/image-picker/image-picker';

@IonicPage()
@Component({
  selector: 'page-daily-one-create',
  templateUrl: 'daily-one-create.html',
})
export class DailyOneCreatePage {

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  year: number; // 当前年
  week:{
    index?: number,
    week?: {
      firstDate: Date,
      lastDate: Date
    }
  } = {};  // 当前周
  dailyOneForm: FormGroup;

  onCreate: ()=>{};

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
    this.week = this.navParams.get('week');
    this.onCreate = this.navParams.get('onCreate');
    this.dailyOneForm = formBuilder.group({
      // title: ['', Validators.compose([Validators.required])],
      content: ['', Validators.compose([Validators.required])]
    });
  }

  postDailyCreate(){
    let params = {
      ...this.dailyOneForm.value,
      year: this.year,
      weekNums: this.week.index,
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
        this.navCtrl.pop();
        this.onCreate && this.onCreate();
      }
    );
  }

  goDailyList() {
    this.navCtrl.push('DailyListRadioPage', {
      onDone: (daily) => {
        this.dailyOneForm.controls['content'].setValue(daily.content)
      }
    });
  }

}
