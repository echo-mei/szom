import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, Events } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-daily-ten-update',
  templateUrl: 'daily-ten-update.html',
})
export class DailyTenUpdatePage {

  dailyTen: any;
  dailyTenForm: FormGroup;
  onUpdate: () => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    public events: Events
  ) {
    this.dailyTen = this.navParams.get('dailyTen');
    this.onUpdate = this.navParams.get('onUpdate');
    this.getDaily();
    this.dailyTenForm = this.formBuilder.group({
      title: [this.dailyTen.title, Validators.compose([Validators.required])],
      content: [this.dailyTen.content, Validators.compose([Validators.required])]
    });
  }

  getDaily() {
    this.dailyProvider.getDailyTen(this.dailyTen.yearlyId).subscribe(
      (daily) => {
        this.dailyTen = daily;
        this.dailyTenForm.controls['title'].setValue(daily.title);
        this.dailyTenForm.controls['content'].setValue(daily.content);
      }
    );
  }

  //修改工作日志
  sendDailyList(){
    let params = {
      ...this.dailyTenForm.value
    };
    this.dailyProvider.updateDailyTen(this.dailyTen.yearlyId, params).subscribe(
      () => {
        this.navCtrl.pop();
        this.onUpdate && this.onUpdate();
      }
    );
  }

}
