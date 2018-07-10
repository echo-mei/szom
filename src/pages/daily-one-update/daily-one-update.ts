import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Events } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-daily-one-update',
  templateUrl: 'daily-one-update.html',
})
export class DailyOneUpdatePage {

  dailyOne: any;
  dailyOneForm: FormGroup;
  onUpdate: () => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    public events: Events
  ) {
    this.dailyOne = this.navParams.get('dailyOne');
    this.onUpdate = this.navParams.get('onUpdate');
    this.getDaily();
    this.dailyOneForm = this.formBuilder.group({
      title: [this.dailyOne.title, Validators.compose([Validators.required])],
      content: [this.dailyOne.content, Validators.compose([Validators.required])]
    });
  }

  getDaily() {
    this.dailyProvider.getDailyOne(this.dailyOne.weeklyId).subscribe(
      (daily) => {
        this.dailyOne = daily;
        this.dailyOneForm.controls['title'].setValue(daily.title);
        this.dailyOneForm.controls['content'].setValue(daily.content);
      }
    );
  }

  //修改工作日志
  sendDailyList(){
    let params = {
      ...this.dailyOneForm.value
    };
    this.dailyProvider.updateDailyOne(this.dailyOne.weeklyId, params).subscribe(
      () => {
        this.navCtrl.pop();
        this.onUpdate && this.onUpdate();
      }
    );
  }

}
