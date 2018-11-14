import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UnitProvider } from '../../providers/unit/unit';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { BzUserInfoPage } from '../bz-user-info/bz-user-info';
import { BzInfoPage } from '../bz-info/bz-info';

@Component({
  selector: 'page-addresslist-unit-search',
  templateUrl: 'addresslist-unit-search.html',
})
export class AddresslistUnitSearchPage {

  @ViewChild('searchEle') searchEle;

  // 搜索关键字
  key: string;
  // 人员列表
  personList: {
    key: string,
    list: any[]
  }[] = [];
  // 人员列表是否正在加载
  isLoading: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public unitProvider: UnitProvider,
    public userProvider: UserProvider,
    public storage: StorageProvider,
    public addresslistProvider: AddresslistProvider
  ) {
  }
  // ============== Public Methods ==================
  // 获取人员列表
  getPersonList(): any {
    this.personList = [];
    if (!this.key) return;
    let params = { keyWords: this.key };
    this.isLoading = true;
    this.unitProvider.getOwnUnitUsersList(params).subscribe(
      (list) => {
        for (let key in list) {
          this.personList.push({
            key: key,
            list: list[key]
          });
        }
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      }
    );
  }

  // =================== Events =======================
  // 跳转到人员信息
  goUserInfo(user): any {
    if (user.userType === "02") {//班子信息
      if (user.userCode == this.storage.me.userCode) {
        this.navCtrl.push(BzInfoPage);
      } else {
        this.navCtrl.push(BzUserInfoPage, {
          user: user,
          followOrCancel: true
        });
      }
    } else {
      if (user.userCode == this.storage.me.userCode) {
        this.navCtrl.push(MeInfoPage, { user: user });
      } else {
        this.navCtrl.push(UserInfoPage, {
          user: user,
          followOrCancel: true,
          showSelfInfo: true,
          showDaily: true,
          showTags: true
        });
      }
    }
  }

  // 搜索
  search() {
    // this.getUnitList();
    this.getPersonList();
  }

  // 返回
  goBack() {
    this.navCtrl.pop();
  }


}
