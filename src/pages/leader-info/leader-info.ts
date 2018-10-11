import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public storage: StorageProvider,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController) {
    this.user = this.navParams.get('user');
    this.getUserInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderInfoLibDetailPage');
  }

   // 获取用户基本信息
   getUserInfo(){
    this.userProvider.getUserInfo({userCode: this.user.userCode}).subscribe(
      (user) => {
        this.user = user;
      }
    );
  }

  getHeadImageUrl(personId) {
    return `${BASE_URL}/personInfo/getPhoto?Authorization=${this.storage.get('token')}&personId=${personId}`;
  }

  follow() {
    let params = {
      attentedUserCode: this.user.userCode,
      status: '02'
    };
    this.userProvider.postAttentedFollow(params).subscribe(
      () => {
        this.getUserInfo();
        this.toastCtrl.create({
          cssClass: 'mini',
          message: '重点关注成功',
          duration: 1000,
          position: 'middle'
        }).present();
      }
    );
  }

  cancelFollow() {
    this.actionSheetCtrl.create({
      title: '确定不再重点关注此人？',
      buttons: [
        {
          text: '确定', handler: () => {
            this.userProvider.postAttentedFollow({
              attentedUserCode: this.user.userCode,
              status: '05'
            }).subscribe(
              () => {
                this.getUserInfo();
              }
            );
          }
        },
        { text: '取消', role: 'cancel' }
      ]
    }).present();
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
  goUserImpression(){
    this.navCtrl.push(UserImpressionPage, {
      user: this.user,
      newFlag:true
    });
  }

  goSign(){
    this.navCtrl.push(UserSignPage, {
      user: this.user
    });
  }

  goWeektable(){
    this.navCtrl.push(WorkWeektablePage, {
      user: this.user,
      newFlag:true
    });
  }

  goDaily(){
    this.navCtrl.push(DailyMePage, {
      user: this.user,
      newFlag:true
    });
  }

  goDailyOne(){
    this.navCtrl.push(DailyOnePage, {
      user: this.user,
      newFlag:true
    });
  }

  goDailyThree(){
    this.navCtrl.push(DailyThreePage, {
      user: this.user,
      newFlag:true
    });
  }

  goDailyTen(){
    this.navCtrl.push(DailyTenPage, {
      user: this.user,
      newFlag:true
    });
  }
}
