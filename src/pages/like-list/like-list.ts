import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-like-list',
  templateUrl: 'like-list.html',
})
export class LikeListPage {

  likerList:object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageProvider
  ) {
    this.likerList = this.navParams.get("likerList");
  }

  goUserInfo(user): any {
    if(user.personId==JSON.parse(this.storage.get('user')).personId) {
      this.navCtrl.push('MeInfoPage');
    }else {
      this.navCtrl.push('UserInfoPage', {
        user: user,
        followOrCancel: true,
        showSelfInfo: true,
        showDaily: true,
        showTags: true
      });
    }
  }

}
