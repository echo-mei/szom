import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,AlertController, Events } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { ImagePickerComponent } from '../../components/image-picker/image-picker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-daily-me-update',
  templateUrl: 'daily-me-update.html',
})
export class DailyMeUpdatePage {

  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  daily: any;
  dailyForm: FormGroup;

  onUpdate: () => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    public events: Events
  ) {
    this.daily = this.navParams.get('daily');
    this.onUpdate = this.navParams.get('onUpdate');
    // this.getDaily();
    this.dailyForm = this.formBuilder.group({
      // title: [this.daily.title, Validators.compose([Validators.required])],
      content: [this.daily.content, Validators.compose([Validators.required])]
    });
  }

  getDaily() {
    this.dailyProvider.getDaily(this.daily.dailyId).subscribe(
      (daily) => {
        this.daily = daily;
        // this.dailyForm.controls['title'].setValue(daily.title);
        this.dailyForm.controls['content'].setValue(daily.content);
      }
    );
  }

  //修改工作日志
  sendDailyList(){
    let params = {
      ...this.dailyForm.value
    };
    this.dailyProvider.updateDaily(this.daily.dailyId, params).subscribe(
      () => {
        this.navCtrl.pop();
        this.onUpdate && this.onUpdate();
      }
    );
  }

}
