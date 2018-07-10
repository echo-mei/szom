import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DateUtilProvider } from '../../providers/date-util/date-util';
import { ImagePickerComponent } from '../../components/image-picker/image-picker';

@IonicPage()
@Component({
  selector: 'page-daily-me-create',
  templateUrl: 'daily-me-create.html',
})
export class DailyMeCreatePage {

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  dailyForm: FormGroup;

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
    this.onCreate = this.navParams.get('onCreate');
    this.dailyForm = formBuilder.group({
      // title: ['', Validators.compose([Validators.required])],
      content: ['', Validators.compose([Validators.required])]
    });
  }

  postDailyCreate(){
    let params = {
      ...this.dailyForm.value
    };
    let files;
    if(this.imagePicker.images.length) {
      files = this.imagePicker.images.map((img) => {
        return {'name': 'files', 'path': img.img};
      });
    }
    this.dailyProvider.createDaily(params, files).subscribe(
      () => {
        this.navCtrl.pop();
        this.onCreate && this.onCreate();
      }
    );
  }

}
