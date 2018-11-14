import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ActionSheetController } from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { UserProvider } from '../../providers/user/user';
import { ImpressionProvider } from '../../providers/impression/impression';
import { StorageProvider } from '../../providers/storage/storage';
import { DynamicProvider } from '../../providers/dynamic/dynamic';
import { BASE_URL } from '../../config';
import { DailyMePage } from '../daily-me/daily-me';
import { UserBaseinfoPage } from '../user-baseinfo/user-baseinfo';
import { UserSelfinfoPage } from '../user-selfinfo/user-selfinfo';
import { UserDynamicListPage } from '../user-dynamic-list/user-dynamic-list';
import { UserImpressionPage } from '../user-impression/user-impression';
import { SignProvider } from '../../providers/sign/sign';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

  showBaseInfo: boolean;
  showSelfInfo: boolean;
  showDaily: boolean;
  showTags: boolean;

  agreeOrRefuse: boolean;  // 同意|拒绝
  followOrCancel: boolean;  // 关注|取关

  user: any = {};

  todaySign: any;

  userBaseInfo:any = {};

  userSelfInfo: any = {};

  daily: any = {};

  tagList: any[] = [];

  onFollow: () => {};
  onCancelFollow: () => {};
  onAgree: () => {};
  onRefuse: () => {};

  isLoading: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public addresslistProvider: AddresslistProvider,
    public userProvider: UserProvider,
    public impressionProvider: ImpressionProvider,
    public storage: StorageProvider,
    public dynamicProvider: DynamicProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public signProvider: SignProvider,
    public statusBar: StatusBar
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

  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  ionViewWillLeave() {
    this.statusBar.styleDefault();
  }

  // 获取用户基本信息
  getUserInfo() {
    this.isLoading = true;
    this.userProvider.getUserInfo({ userCode: this.user.userCode }).subscribe(
      (user) => {
        this.user = user;
        // this.getUserBaseInfo();
        this.getTodaySign();
        this.getUserSelfInfo();
        this.getImpressionList();
        this.getUerDailyList();
        this.isLoading = false;
      }
    );
  }


  // 获取今天的签到信息
  getTodaySign() {
    let params = {
      userCode: this.user.userCode
    }
    this.signProvider.getTodaySign(params).subscribe(
      (data) => {
        this.todaySign = data;
      }
    );
  }

  // 获取用户基本信息
  getUserBaseInfo() {
    this.userProvider.getUserInfoByPersonId(this.user.personId).subscribe(
      (user) => {
        this.userBaseInfo = user;
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

  getHeadImageUrl(personId) {
    return `${BASE_URL}/personInfo/getPhoto?Authorization=${this.storage.token}&personId=${personId}`;
  }

  goBaseInfo() {
    this.navCtrl.push(UserBaseinfoPage, {
      user: this.user
    });
  }

  goUserSelfInfo() {
    this.navCtrl.push(UserSelfinfoPage, {
      user: this.user
    });
  }

  goUserDynamicList() {
    this.navCtrl.push(UserDynamicListPage, {
      user: this.user
    });
  }

  goUserImpression() {
    this.navCtrl.push(UserImpressionPage, {
      user: this.user,
      onUpdate:this.getImpressionList.bind(this)
    });
  }

  follow() {
    let params = {
      attentedUserCode: this.user.userCode,
      userCode: this.storage.me.userCode
    };
    this.userProvider.postFollow(params).subscribe(
      () => {
        this.getUserInfo();
        this.onFollow && this.onFollow();
        this.toastCtrl.create({
          cssClass: 'mini',
          message: '关注申请已发送',
          duration: 1000,
          position: 'middle'
        }).present();
      }
    );
  }

  cancelFollow() {
    this.actionSheetCtrl.create({
      title: '确定不再关注此人？',
      buttons: [
        {
          text: '确定', handler: () => {
            this.userProvider.postFollow({
              attentedUserCode: this.user.userCode,
              userCode: this.storage.me.userCode,
              status: '05'
            }).subscribe(
              () => {
                this.getUserInfo();
                this.onCancelFollow && this.onCancelFollow();
              }
            );
          }
        },
        { text: '取消', role: 'cancel' }
      ]
    }).present();
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
