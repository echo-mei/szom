import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Events } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { ImagePickerComponent } from '../../components/image-picker/image-picker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-daily-update',
  templateUrl: 'daily-update.html',
})
export class DailyUpdatePage {

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  single:boolean = false;

  daily: any;

  dailyForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    public events: Events
  ) {
    this.daily = this.navParams.get('daily');
    this.single = this.navParams.get('single');
    this.dailyForm = this.formBuilder.group({
      title: [this.daily.title, Validators.compose([Validators.required])],
      content: [this.daily.content, Validators.compose([Validators.required])]
    });
  }

  //修改工作日志
  sendDailyList(){
    this.dailyProvider.updateDaily(this.daily.dailyId, this.dailyForm.value).subscribe(
      () => {
        this.navCtrl.pop();
        this.dailyProvider.getDaily(this.daily.dailyId).subscribe(
          daily => {
            for(let key in daily) {
              this.daily[key] = daily[key];
            }
          }
        );
      }
    );
  }

}
