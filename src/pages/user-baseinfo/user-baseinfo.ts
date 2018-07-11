import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-user-baseinfo',
  templateUrl: 'user-baseinfo.html',
})
export class UserBaseinfoPage {

  user: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider
  ) {
    this.user = this.navParams.get('user');
  }

}
