import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { BzDailyMePage } from '../bz-daily-me/bz-daily-me';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { BzDailyProvider } from '../../providers/bz-daily/bz-daily';
import { BzUserInfoIntroPage } from '../bz-user-info-intro/bz-user-info-intro';


@Component({
  selector: 'page-bz-user-info',
  templateUrl: 'bz-user-info.html',
})
export class BzUserInfoPage {

  // 班子
  user: any;
  // 关注|取关
  followOrCancel = false;
  // 同意|拒绝
  agreeOrRefuse = false;
  // 班子工作日志
  daily: any = {};

  onFollow: () => {};
  onCancelFollow: () => {};
  onAgree: () => {};
  onRefuse: () => {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public bzInfoProvider: BzInfoProvider,
    public actionSheetCtrl: ActionSheetController,
    public addresslistProvider: AddresslistProvider,
    public bzDailyProvider: BzDailyProvider,
    public storage: StorageProvider,
    public userProvider: UserProvider,
    public toastCtrl: ToastController) {
    this.user = this.navParams.get("user");
    this.followOrCancel = this.navParams.get("followOrCancel");
    this.agreeOrRefuse = this.navParams.get("agreeOrRefuse");
    this.onFollow = this.navParams.get('onFollow');
    this.onCancelFollow = this.navParams.get('onCancelFollow');
    this.onAgree = this.navParams.get('onAgree');
    this.onRefuse = this.navParams.get('onRefuse');
    this.getBzInfo();
    this.getUerDailyList();
  }

  // ============================ Public Methods ==================================
  // 获取班子信息
  getBzInfo() {
    let params = {
      userCode: this.user.userCode
    }
    this.bzInfoProvider.getBzInfo(params).subscribe(
      (user) => {
        this.user = user;
      }
    )
  }

  // 获取用户日志列表
  getUerDailyList() {
    this.bzDailyProvider.getLogDailyList({
      size: 1,
      userCode: this.user.userCode,
    }).subscribe(
      (list) => {
        list.length && (this.daily = list[0]);
      }
    );
  }
  // ============================ Events ==========================================
  // 进入日志列表页
  goUserDailyList(){
    this.navCtrl.push(BzDailyMePage, {
      user: this.user
    });
  }

  // 进入班子概述
  goBzUserInfoIntro(teamDesc){
    this.navCtrl.push(BzUserInfoIntroPage,{
      teamDesc:teamDesc
    })
  }

  // 点击关注
  onClickfollow() {
    let params = {
      attentedUserCode: this.user.userCode,
      userCode: this.storage.me.userCode
    };
    this.userProvider.postFollow(params).subscribe(
      () => {
        this.getBzInfo();
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

  // 点击取消关注
  onClickUnfollow() {
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
                this.getBzInfo();
                this.onCancelFollow && this.onCancelFollow();
              }
            );
          }
        },
        { text: '取消', role: 'cancel' }
      ]
    }).present();
  }

  // 同意关注
  onClickAgree() {
    this.addresslistProvider.changeStatus({
      userCode: this.user.userCode,
      status: '02'
    }).subscribe(
      () => {
        this.agreeOrRefuse = false;
        this.followOrCancel = true;
        this.getBzInfo();
        this.onAgree && this.onAgree();
      }
    );
  }

  // 拒绝
  onClickRefuse() {
    this.addresslistProvider.changeStatus({
      userCode: this.user.userCode,
      status: '03'
    }).subscribe(
      () => {
        this.agreeOrRefuse = false;
        this.followOrCancel = true;
        this.getBzInfo();
        this.onRefuse && this.onRefuse();
      }
    );
  }

  // 点击工作日志
  onClickDaily() {
    this.navCtrl.push(BzDailyMePage, {
      user: this.user
    });
  }



}
