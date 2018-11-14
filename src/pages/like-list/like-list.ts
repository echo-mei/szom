import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';
import { BzUserInfoPage } from '../bz-user-info/bz-user-info';
import { BzInfoPage } from '../bz-info/bz-info';

@Component({
  selector: 'page-like-list',
  templateUrl: 'like-list.html',
})
export class LikeListPage {

  likerList: object;
  attention: any;
  myUnit: any;
  otherUnit: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageProvider,
    public userProvider: UserProvider
  ) {
    this.likerList = this.navParams.get("likerList");
    this.attention = this.likerList['listAttention'].length - 1;
    this.myUnit = this.likerList['listMyUnit'].length - 1;
    this.otherUnit = this.likerList['listOtherUnit'].length - 1;
  }

  goUserInfo(user): any {
    if (user.userType === "02") {//班子信息
      if (user.userCode == this.storage.me.userCode) {
        this.navCtrl.push(BzInfoPage);
      } else {
        this.navCtrl.push(BzUserInfoPage, {
          user: user,
          followOrCancel: true
        });
      }
    } else {
      if (user.userCode == this.storage.me.userCode) {
        this.navCtrl.push(MeInfoPage);
      } else {
        this.navCtrl.push(UserInfoPage, {
          user: user,
          showSelfInfo: true,
          showDaily: true,
          showTags: true,
          followOrCancel: true
        });
      }
    }
  }

}
