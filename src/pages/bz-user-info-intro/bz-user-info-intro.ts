import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-bz-user-info-intro',
  templateUrl: 'bz-user-info-intro.html',
})
export class BzUserInfoIntroPage {

  // 班子概述
  teamDesc:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.teamDesc = this.navParams.get('teamDesc');
  }

}
