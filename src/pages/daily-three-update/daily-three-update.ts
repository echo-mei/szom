import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, Events } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-daily-three-update',
  templateUrl: 'daily-three-update.html',
})
export class DailyThreeUpdatePage {

  dailyThree: any;
  dailyThreeForm: FormGroup;
  onUpdate: () => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    public events: Events
  ) {
    this.dailyThree = this.navParams.get('dailyThree');
    this.onUpdate = this.navParams.get('onUpdate');
    this.getDaily();
    this.dailyThreeForm = this.formBuilder.group({
      title: [this.dailyThree.title, Validators.compose([Validators.required])],
      content: [this.dailyThree.content, Validators.compose([Validators.required])]
    });
  }

  getDaily() {
    this.dailyProvider.getDailyThree(this.dailyThree.quarterlyId).subscribe(
      (daily) => {
        this.dailyThree = daily;
        this.dailyThreeForm.controls['title'].setValue(daily.title);
        this.dailyThreeForm.controls['content'].setValue(daily.content);
      }
    );
  }

  //修改工作日志
  sendDailyList(){
    let params = {
      ...this.dailyThreeForm.value
    };
    this.dailyProvider.updateDailyThree(this.dailyThree.quarterlyId, params).subscribe(
      () => {
        this.navCtrl.pop();
        this.onUpdate && this.onUpdate();
      }
    );
  }

}
