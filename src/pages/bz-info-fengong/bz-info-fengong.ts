import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { UserInfoPage } from '../user-info/user-info';
import { LeaderInfoPage } from '../leader-info/leader-info';


@Component({
  selector: 'page-bz-info-fengong',
  templateUrl: 'bz-info-fengong.html',
})
export class BzInfoFengongPage {

  // 用户
  user: any;
  // 班子成员列表
  personList: Array<object>;
  // 班子职数
  bzZhiShu:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public bzInfoProvider: BzInfoProvider,
    public userProvider: UserProvider,
    public storage: StorageProvider
  ) {
    this.user = this.navParams.get("user");
    this.getBzMember();
    this.getBzZhiShu();
  }

  // =================== Public Methods =====================
  // 获取班子成员
  getBzMember() {
    let params = {
      unitId: this.user.unitId
    }
    this.bzInfoProvider.getBzInfoMember(params).subscribe(
      (list) => {
        this.personList = list;
      }
    )
  }

  // 获取班子职数
  getBzZhiShu() {
    let params = {
      unitId: this.user.unitId
    }
    this.bzInfoProvider.getBzZhiShu(params).subscribe(
      (data) => {
        this.bzZhiShu = data;
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
