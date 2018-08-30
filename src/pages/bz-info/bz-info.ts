import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopSelectComponent } from '../../components/pop-select/pop-select';
import { DailyMePage } from '../daily-me/daily-me';
import { BzInfoUserInfoPage } from '../bz-info-user-info/bz-info-user-info';

@Component({
  selector: 'page-bz-info',
  templateUrl: 'bz-info.html',
})
export class BzInfoPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public popoverCtrl: PopoverController
  ) {
  }
  popover(event){
    const popover = this.popoverCtrl.create(PopSelectComponent, {
      buttons: [
        {
          // icon: 'md-gongzuorizhi',
          text: '添加',
          handler: () => {
            this.navCtrl.push(DailyMePage);
            popover.dismiss();
          }
        },
        {
          // icon: 'md-gongzuorizhi',
          text: '删除',
          handler: () => {
            this.navCtrl.push(DailyMePage);
            popover.dismiss();
          }
        },
      ]
    }, {
        cssClass: 'mini'
      });
    popover.present({
      ev: event
    });
  }

  goFengong(){
    this.navCtrl.push(BzInfoUserInfoPage)
  }
}
