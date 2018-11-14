import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams, AlertController, Events, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { ImagePickerComponent } from '../../components/image-picker/image-picker';
import { BzDailyProvider } from '../../providers/bz-daily/bz-daily';

@Component({
  selector: 'page-bz-daily-me-create',
  templateUrl: 'bz-daily-me-create.html',
})
export class BzDailyMeCreatePage {

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  maxLength: number = 196;

  dailyForm: FormGroup;

  onCreate: () => {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bzDailyProvider: BzDailyProvider,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    public events: Events,
    public dateUtil: DateUtilProvider,
    public toastCtrl: ToastController,
  ) {
    this.onCreate = this.navParams.get('onCreate');
    this.dailyForm = formBuilder.group({
      // title: ['', Validators.compose([Validators.required])],
      content: ['', Validators.compose([Validators.required])]
    });
  }
  postDailyCreate(){
    let params = {
      ...this.dailyForm.value,
    };
    let files;
    if(this.imagePicker.images.length) {
      files = this.imagePicker.images.map((img) => {
        return {'name': 'files', 'path': img.img};
      });
    }
    this.bzDailyProvider.createDaily(params, files).subscribe(
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

}
