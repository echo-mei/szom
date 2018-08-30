import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';

@Component({
  selector: 'page-like-list',
  templateUrl: 'like-list.html',
})
export class LikeListPage {

  likerList:object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageProvider,
    public userProvider: UserProvider
  ) {
    this.likerList = this.navParams.get("likerList");
  }

  goUserInfo(user): any {
    if(user.personId==JSON.parse(this.storage.get('user')).personId) {
      this.navCtrl.push(MeInfoPage);
    }else {
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
