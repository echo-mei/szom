import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BzInfoUserUpdateWorkPage } from '../bz-info-user-update-work/bz-info-user-update-work';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';

@Component({
  selector: 'page-bz-info-user-info',
  templateUrl: 'bz-info-user-info.html',
})
export class BzInfoUserInfoPage {

  user: any;
  personList = [];
  division: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider:UserProvider,
    public storage: StorageProvider,
    public bzInfoProvider: BzInfoProvider
  ) {
    this.user = this.navParams.get('user');
    this.getBzMember();
  }

  getBzMember() {
    let params = {
      leaderTeamMemberId:this.user.leaderTeamMemberId
    }
    this.bzInfoProvider.getBzFengong(params).subscribe(
      (data) => {
        this.user = data;
      }
    )
  }

  goUserInfo(user): any {
    if(user.userCode==this.storage.me.userCode) {
      this.navCtrl.push(MeInfoPage);
    }else {
      this.navCtrl.push(UserInfoPage, {
        user: user,
        followOrCancel: true,
        showSelfInfo: true,
        showDaily: true,
        showTags: true
      });
    }
  }

  goUpdate() {
    this.navCtrl.push(BzInfoUserUpdateWorkPage, {
      user:this.user,
      onUpdate: this.getBzMember.bind(this),
      divisiton: this.user.division
    });
  }
}
