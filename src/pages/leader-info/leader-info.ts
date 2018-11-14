import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController, PopoverController, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { BASE_URL } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';
import { UserBaseinfoPage } from '../user-baseinfo/user-baseinfo';
import { UserSelfinfoPage } from '../user-selfinfo/user-selfinfo';
import { UserImpressionPage } from '../user-impression/user-impression';
import { WorkWeektablePage } from '../work-weektable/work-weektable';
import { DailyMePage } from '../daily-me/daily-me';
import { DailyOnePage } from '../daily-one/daily-one';
import { DailyThreePage } from '../daily-three/daily-three';
import { DailyTenPage } from '../daily-ten/daily-ten';
import { UserSignPage } from '../user-sign/user-sign';
import { HeavyFocusProvider } from '../../providers/heavy-focus/heavy-focus';
import { SignDatePage } from '../sign-date/sign-date';
import { LeaderInfoSlidesPage } from '../leader-info-slides/leader-info-slides';

/**
 * Generated class for the LeaderInfoLibDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-leader-info',
  templateUrl: 'leader-info.html',
})
export class LeaderInfoPage {
  user: any = {};

  onEmpFollow: () => {};
  onUnEmpFollow: () => {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public heavyFocusProvider: HeavyFocusProvider,
    public storage: StorageProvider,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController) {
    this.user = this.navParams.get('user');
    this.onEmpFollow = this.navParams.get("onEmpFollow");
    this.onUnEmpFollow = this.navParams.get("onUnEmpFollow");
    this.getUserInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderInfoLibDetailPage');
  }

  // 获取用户基本信息
  getUserInfo() {
    this.userProvider.getUserInfo({ userCode: this.user.userCode }).subscribe(
      (user) => {
        this.user = user;
      }
    );
  }

  getHeadImageUrl(personId) {
    return `${BASE_URL}/personInfo/getPhoto?Authorization=${this.storage.token}&personId=${personId}`;
  }

  follow() {
    let params = {
      attentedUserCode: this.user.userCode,
      status: '02'
    };
    this.heavyFocusProvider.postAttentedFollow(params).subscribe(
      () => {
        this.getUserInfo();
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

  cancelFollow() {
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
                this.getUserInfo();
                this.onUnEmpFollow && this.onUnEmpFollow();
              }
            );
          }
        },
        { text: '取消', role: 'cancel' }
      ]
    }).present();
  }

  // 跳转到签到历史界面
  goMeSign() {
    this.modalCtrl.create(SignDatePage, {
      user:this.user
    }).present();
  }

  // 跳转到切换页
  goLeaderInfoSlides(index) {
    this.navCtrl.push(LeaderInfoSlidesPage, {
      index: index,
      user: this.user
    });
  }

  //进到个人基本信息详情页
  goBaseInfo() {
    this.navCtrl.push(UserBaseinfoPage, {
      user: this.user
    });
  }

  //进到个人自述信息详情页
  goUserSelfInfo() {
    this.navCtrl.push(UserSelfinfoPage, {
      user: this.user
    });
  }

  //进到个人印象标签详情页
  goUserImpression() {
    this.navCtrl.push(UserImpressionPage, {
      user: this.user
    });
  }

  goWeektable() {
    this.navCtrl.push(WorkWeektablePage, {
      user: this.user
    });
  }

  goDaily() {
    this.navCtrl.push(DailyMePage, {
      user: this.user
    });
  }

  goDailyOne() {
    this.navCtrl.push(DailyOnePage, {
      user: this.user
    });
  }

  goDailyThree() {
    this.navCtrl.push(DailyThreePage, {
      user: this.user
    });
  }

  goDailyTen() {
    this.navCtrl.push(DailyTenPage, {
      user: this.user
    });
  }
}
