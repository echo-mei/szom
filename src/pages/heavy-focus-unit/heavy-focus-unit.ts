import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HeavyFocusProvider } from '../../providers/heavy-focus/heavy-focus';
import { HeavyFocusAddSearchPage } from '../heavy-focus-add-search/heavy-focus-add-search';
import { LeaderInfoPage } from '../leader-info/leader-info';
import { BzInfoLibShowPage } from '../bz-info-lib-show/bz-info-lib-show';
import { UserProvider } from '../../providers/user/user';


@Component({
  selector: 'page-heavy-focus-unit',
  templateUrl: 'heavy-focus-unit.html',
})
export class HeavyFocusUnitPage {

  // 组织机构列表
  organizationlist: Array<Object> = [];
  // 人员列表
  personList: any[] = [];
  // 机构
  org: any;

  onEmpFollow: () => {};
  onUnEmpFollow: () => {};

  constructor(public navCtrl: NavController,
    public heavyFocusProvider: HeavyFocusProvider,
    public userProvider: UserProvider,
    public navParams: NavParams) {
    this.org = this.navParams.get("org");
    this.onEmpFollow = this.navParams.get("onEmpFollow");
    this.onUnEmpFollow = this.navParams.get("onUnEmpFollow");
    this.getUnHeavyFocusUnitList();
    this.getUnHeavyFocusPersonList();
  }

  // ============================ Public Methods ==================================
  // 获取可以重点关注的人员所在单位列表
  getUnHeavyFocusUnitList() {
    let params = {
      orgId: this.org.organizationId
    }
    this.heavyFocusProvider.getUnHeavyFocusUnitList(params).subscribe(
      list => {
        if (list.length > 0) {
          this.organizationlist = list;
        }
      });
  }

  // 获取可以重点关注的人员列表
  getUnHeavyFocusPersonList() {
    let params = {
      orgId: this.org.organizationId
    }
    this.heavyFocusProvider.getUnHeavyFocusPersonList(params).subscribe(
      list => {
        this.personList = list;
      });
  }

  // ============================ Events ==================================
  // 点击机构
  onClickOrg(org) {
    this.navCtrl.push(HeavyFocusUnitPage, {
      org: org,
      onEmpFollow: () => { this.onEmpFollow() },
      onUnEmpFollow: () => { this.onUnEmpFollow() }
    })
  }

  // 点击人员
  onClickUser(user) {
    if (user.userType === "01") {//干部信息
      this.navCtrl.push(LeaderInfoPage, {
        user: user,
        onEmpFollow: () => { this.onEmpFollow() },
        onUnEmpFollow: () => { this.onUnEmpFollow() }
      });
    } else if (user.userType === "02") {//班子信息
      this.navCtrl.push(BzInfoLibShowPage, {
        user: user,
        empFollowOrCancel:true,
        onEmpFollow: () => { this.onEmpFollow() },
        onUnEmpFollow: () => { this.onUnEmpFollow() }
      });
    }
  }

}
