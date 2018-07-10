import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { UserProvider } from '../../providers/user/user';
import { ImpressionProvider } from '../../providers/impression/impression';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

  showSelfInfo:boolean;
  showDaily:boolean;
  showTags:boolean;

  agreeOrRefuse:boolean;  // 同意|拒绝
  followOrCancel:boolean;  // 关注|取关

  user: any = {};

  userSelfInfo: any = {};

  tagList: any[] = [];

  onFollow: () => {};
  onCancelFollow: () => {};
  onAgree: () => {};
  onRefuse: () => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public addresslistProvider: AddresslistProvider,
    public userProvider: UserProvider,
    public impressionProvider: ImpressionProvider,
    public storage: StorageProvider
  ) {
    this.showSelfInfo = this.navParams.get('showSelfInfo');
    this.showDaily = this.navParams.get('showDaily');
    this.showTags = this.navParams.get('showTags');
    this.agreeOrRefuse = this.navParams.get('agreeOrRefuse');
    this.followOrCancel = this.navParams.get('followOrCancel');
    this.onFollow = this.navParams.get('onFollow');
    this.onCancelFollow = this.navParams.get('onCancelFollow');
    this.onAgree = this.navParams.get('onAgree');
    this.onRefuse = this.navParams.get('onRefuse');
    this.user = this.navParams.get('user');
    this.getUserInfo();
  }

  // 获取用户基本信息
  getUserInfo(){
    this.userProvider.getUserInfoByPersonId(this.user.personId).subscribe(
      (user) => {
        this.user = user;
        this.getUserSelfInfo();
        this.getImpressionList();
      }
    );
  }

  // 获取用户自述信息
  getUserSelfInfo() {
    this.userProvider.getUserSelfInfo(this.user.personId).subscribe(
      (data) => {
        this.userSelfInfo = data;
      }
    );
  }

  // 获取用户标签列表
  getImpressionList() {
    this.impressionProvider.statistics({
      tagOwner: this.user.userCode
    }).subscribe(
      (list) => {
        this.tagList = list;
      }
    );
  }

  goDailyList() {
    this.navCtrl.push('DailyMePage');
  }

  goUserSelfInfo() {
    this.navCtrl.push('UserSelfinfoPage', {
      user: this.user
    });
  }

  goUserImpression() {
    this.navCtrl.push('UserImpressionPage', {
      user: this.user
    });
  }

  follow() {
    let params = {
      attentedUserCode: this.user.userCode,
      userCode: JSON.parse(this.storage.get('user')).userCode
    };
    this.userProvider.postFollow(params).subscribe(
      () => {
        this.getUserInfo();
        this.onFollow && this.onFollow();
      }
    );
  }

  cancelFollow() {
    this.userProvider.postFollow({
      userCode: this.user.userCode,
      status: '05'
    }).subscribe(
      () => {
        this.getUserInfo();
        this.onCancelFollow && this.onCancelFollow();
      }
    );
  }

  agree() {
    this.addresslistProvider.changeStatus({
      userCode: this.user.userCode,
      status: '02'
    }).subscribe(
      () => {
        this.agreeOrRefuse = false;
        this.followOrCancel = true;
        this.getUserInfo();
        this.onAgree && this.onAgree();
      }
    );
  }

  refuse() {
    this.addresslistProvider.changeStatus({
      userCode: this.user.userCode,
      status: '03'
    }).subscribe(
      () => {
        this.getUserInfo();
        this.onRefuse && this.onRefuse();
      }
    );
  }

}
