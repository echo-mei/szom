import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopSelectComponent } from '../../components/pop-select/pop-select';
import { BzInfoUserInfoPage } from '../bz-info-user-info/bz-info-user-info';
import { BzInfoAddUserPage } from '../bz-info-add-user/bz-info-add-user';
import { BzInfoDelUserPage } from '../bz-info-del-user/bz-info-del-user';
import { BzInfoUpdateIntroPage } from '../bz-info-update-intro/bz-info-update-intro';
import { BzInfoSortUserPage } from '../bz-info-sort-user/bz-info-sort-user';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-bz-info',
  templateUrl: 'bz-info.html',
})
export class BzInfoPage {

  // 当前用户
  me: any;
  // 平均年龄
  averageAge: any=' -- ';
  // 班子信息
  bzUser:any = {};
  // 班子成员列表
  personList: Array<object>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public bzInfoProvider: BzInfoProvider,
    public userProvider: UserProvider,
    public storage: StorageProvider
  ) {
    this.me = this.storage.me;
    this.getBzInfo();
    this.getBzMember();
  }

  // =================== Public Methods =====================
  // 获取班子信息
  getBzInfo() {
    let params = {
      userCode: this.me.userCode
    }
    this.bzInfoProvider.getBzInfo(params).subscribe(
      (user) => {
        this.bzUser = user;
      }
    )
  }
  // 获取班子成员
  getBzMember() {
    let params = {
      unitId: this.me.orgId
    }
    this.bzInfoProvider.getBzInfoMember(params).subscribe(
      (list) => {
        let sum = 0;
        this.personList = list;
        if (this.personList.length) {
          this.personList.forEach((item) => {
            sum += item["age"];
          })
          this.averageAge = Math.floor(sum / this.personList.length);
        }
      }
    )
  }

  // ================ Events ===================
  popover(event) {
    const popover = this.popoverCtrl.create(PopSelectComponent, {
      buttons: [
        {
          text: '添加',
          handler: () => {
            this.navCtrl.push(BzInfoAddUserPage, {
              teamName: this.me.orgName,
              me: this.me,
              showSearch: true,
              onAdd: this.getBzMember.bind(this)
            });
            popover.dismiss();
          }
        },
        {
          text: '移除',
          handler: () => {
            this.navCtrl.push(BzInfoDelUserPage, {
              teamName: this.me.orgName,
              me: this.me,
              onUpdate: this.getBzMember.bind(this)
            });
            popover.dismiss();
          }
        },
        {
          // icon: 'md-gongzuorizhi',
          text: '排序',
          handler: () => {
            this.navCtrl.push(BzInfoSortUserPage, {
              teamName: this.me.orgName,
              onSortUpdate: this.getBzMember.bind(this),
              teamList: this.personList
            });
            popover.dismiss();
          }
        },
      ]
    }, {
        cssClass: 'mini'
      });
    popover.present({
      ev: event
    });
  }

  goUserInfo(user){
    this.navCtrl.push(BzInfoUserInfoPage, {
      user: user,
    })
  }

  goBzIntro() {
    this.navCtrl.push(BzInfoUpdateIntroPage, {
      leaderTeamId: this.bzUser.leaderTeamId,
      teamDesc: this.bzUser.teamDesc,
      teamName: this.bzUser.teamName,
      unitId: this.bzUser.unitId,
      onUpdate: this.getBzInfo.bind(this)
    });
  }
}
