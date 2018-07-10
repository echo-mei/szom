import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-user-selfinfo',
  templateUrl: 'user-selfinfo.html',
})
export class UserSelfinfoPage {

  user: any;

  userSelfInfo: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider
  ) {
    this.user = this.navParams.get('user');
    this.getUserSelfInfo();
  }

  // 获取用户自述信息
  getUserSelfInfo() {
    this.userProvider.getUserSelfInfo(this.user.personId).subscribe(
      (data) => {
        this.userSelfInfo = data;
      }
    );
  }

}
