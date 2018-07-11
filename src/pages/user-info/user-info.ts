import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { UserProvider } from '../../providers/user/user';
import { ImpressionProvider } from '../../providers/impression/impression';
import { StorageProvider } from '../../providers/storage/storage';
import { DynamicProvider } from '../../providers/dynamic/dynamic';

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

  showBaseInfo:boolean;
  showSelfInfo:boolean;
  showDaily:boolean;
  showTags:boolean;

  agreeOrRefuse:boolean;  // 同意|拒绝
  followOrCancel:boolean;  // 关注|取关

  user: any = {};

  userSelfInfo: any = {};

  daily: any = {};

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
    public storage: StorageProvider,
    public dynamicProvider: DynamicProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    this.showBaseInfo = this.navParams.get('showBaseInfo');
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
    this.userProvider.getUserInfo({userCode: this.user.userCode}).subscribe(
      (user) => {
        this.user = user;
        this.getUserSelfInfo();
        this.getImpressionList();
        this.getUerDailyList();
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

  // 获取用户日志列表
  getUerDailyList() {
    this.dynamicProvider.getPersonDynamicList({
      userCode: this.user.userCode,
      size: 1
    }).subscribe(
      (list) => {
        list.length && (this.daily = list[0]);
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

  goBaseInfo() {
    this.navCtrl.push('UserBaseinfoPage', {
      user: this.user
    });
  }

  goUserSelfInfo() {
    this.navCtrl.push('UserSelfinfoPage', {
      user: this.user
    });
  }

  goUserDynamicList() {
    this.navCtrl.push('UserDynamicListPage', {
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
        this.toastCtrl.create({
          cssClass: 'mini',
          message: '发送关注申请成功',
          duration: 1000,
          position: 'middle'
        }).present();
      }
    );
  }

  cancelFollow() {
    let alert = this.alertCtrl.create({
      message: '确认删除？',
      buttons: [
        { text: '取消', role: 'cancel' },
        {
          text: '确认', handler: () => {
            this.userProvider.postFollow({
              attentedUserCode: this.user.userCode,
              userCode: JSON.parse(this.storage.get('user')).userCode,
              status: '05'
            }).subscribe(
              () => {
                this.getUserInfo();
                this.onCancelFollow && this.onCancelFollow();
              }
            );
          }
        }
      ]
    });
    alert.present();
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
        this.agreeOrRefuse = false;
        this.followOrCancel = true;
        this.getUserInfo();
        this.onRefuse && this.onRefuse();
      }
    );
  }

}
