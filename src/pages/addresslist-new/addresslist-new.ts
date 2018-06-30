import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-addresslist-new',
  templateUrl: 'addresslist-new.html',
})
export class AddresslistNewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goUserInfo() {
    this.navCtrl.push('UserInfoPage');
  }

}
