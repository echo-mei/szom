import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';
import { LeaderInfoPage } from '../leader-info/leader-info';


@Component({
  selector: 'page-bz-info-look',
  templateUrl: 'bz-info-look.html',
})
export class BzInfoLookPage {

  // 用户
  user: any;
  // 平均年龄
  averageAge: any = ' -- ';
  // 班子成员列表
  personList: Array<object>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public bzInfoProvider: BzInfoProvider,
    public userProvider: UserProvider,
    public storage: StorageProvider) {
    this.user = this.navParams.get("user");
    this.getBzInfo();
    this.getBzMember();
  }


  // =================== Public Methods =====================
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
  // 获取班子成员
  getBzMember() {
    let params = {
      unitId: this.user.unitId
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

    // ============================ Events ================================
  // 跳转到用户信息
  onClickUser(user) {
    this.navCtrl.push(LeaderInfoPage, {
      user: user
    });
  }


}
