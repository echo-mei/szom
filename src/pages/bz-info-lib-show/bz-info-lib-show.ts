import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { BzInfoLibProvider } from '../../providers/bz-info-lib/bz-info-lib';
import { HeavyFocusProvider } from '../../providers/heavy-focus/heavy-focus';
import { BzDailyMePage } from '../bz-daily-me/bz-daily-me';
import { BzWorkWeektablePage } from '../bz-work-weektable/bz-work-weektable';
import { BzInfoFengongPage } from '../bz-info-fengong/bz-info-fengong';
import { BzPositionLookPage } from '../bz-position-look/bz-position-look';
import { BzWeaveLookPage } from '../bz-weave-look/bz-weave-look';
import { BzInfoLookPage } from '../bz-info-look/bz-info-look';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';


@Component({
  selector: 'page-bz-info-lib-show',
  templateUrl: 'bz-info-lib-show.html',
})
export class BzInfoLibShowPage {

  // 班子
  user: any;
  // 重点关注|取消重点关注
  empFollowOrCancel = false;
  // 关注|取关
  followOrCancel = false;
  // 同意|拒绝
  agreeOrRefuse = false;

  onEmpFollow: () => {};
  onUnEmpFollow: () => {};
  onFollow: () => {};
  onCancelFollow: () => {};
  onAgree: () => {};
  onRefuse: () => {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public heavyFocusProvider: HeavyFocusProvider,
    public bzInfoLibProvider: BzInfoLibProvider,
    public bzInfoProvider: BzInfoProvider,
    public actionSheetCtrl: ActionSheetController,
    public addresslistProvider: AddresslistProvider,
    public storage: StorageProvider,
    public userProvider: UserProvider,
    public toastCtrl: ToastController) {
    this.user = this.navParams.get("user");
    this.followOrCancel = this.navParams.get("followOrCancel");
    this.agreeOrRefuse = this.navParams.get("agreeOrRefuse");
    this.empFollowOrCancel = this.navParams.get("empFollowOrCancel");
    this.onEmpFollow = this.navParams.get("onEmpFollow");
    this.onUnEmpFollow = this.navParams.get("onUnEmpFollow");
    this.onFollow = this.navParams.get('onFollow');
    this.onCancelFollow = this.navParams.get('onCancelFollow');
    this.onAgree = this.navParams.get('onAgree');
    this.onRefuse = this.navParams.get('onRefuse');
    this.getBzInfo();
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

  // ============================ Events ==========================================
  // 点击重点关注
  onClickEmpfollow() {
    let params = {
      attentedUserCode: this.user.userCode,
      status: '02'
    };
    this.heavyFocusProvider.postAttentedFollow(params).subscribe(
      () => {
        this.getBzInfo();
        this.toastCtrl.create({
          cssClass: 'mini',
          message: '重点关注成功',
          duration: 1000,
          position: 'middle'
        }).present();
        this.onEmpFollow && this.onEmpFollow();
      }
    );
  }

  // 点击取消重点关注
  onClickUnEmpfollow() {
    this.actionSheetCtrl.create({
      title: '确定不再重点关注此人？',
      buttons: [
        {
          text: '确定', handler: () => {
            this.heavyFocusProvider.postAttentedFollow({
              attentedUserCode: this.user.userCode,
              status: '05'
            }).subscribe(
              () => {
                this.getBzInfo();
                this.onUnEmpFollow && this.onUnEmpFollow();
              }
            );
          }
        },
        { text: '取消', role: 'cancel' }
      ]
    }).present();
  }

  // 点击工作日志
  onClickDaily() {
    this.navCtrl.push(BzDailyMePage, {
      user: this.user
    });
  }

  // 点击班子工作周表
  onClickWeektable() {
    this.navCtrl.push(BzWorkWeektablePage, {
      user: this.user
    });
  }

  // 点击班子分工
  onClickBzFg() {
    this.navCtrl.push(BzInfoFengongPage, {
      user: this.user
    });
  }

  // 点击班子基本信息
  onClickBzInfo() {
    this.navCtrl.push(BzInfoLookPage, {
      user: this.user
    });
  }

}
