import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Searchbar } from 'ionic-angular';
import { UnitProvider } from '../../providers/unit/unit';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { AddresslistOtherPage } from '../addresslist-other/addresslist-other';
import { BzInfoPage } from '../bz-info/bz-info';
import { BzUserInfoPage } from '../bz-user-info/bz-user-info';

@Component({
  selector: 'page-addresslist-other-search',
  templateUrl: 'addresslist-other-search.html',
})
export class AddresslistOtherSearchPage {

  @ViewChild('searchEle') searchEle: Searchbar;

  key: string;

  unitList: any[] = [];
  // 人员列表
  personList: {
    key: string,
    list: any[]
  }[] = [];
  // 列表是否正在加载
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

  ionViewDidEnter() {
    setTimeout(() => {
      this.searchEle.setFocus();
    }, 150);
  }


  getUnitList(): any {
    this.unitList = [];
    if (!this.key) return;
    let params = { keyWords: this.key };
    this.unitProvider.getOtherUnitOrgsList(params).subscribe(
      (list) => {
        list.length && (this.unitList = list);
      }
    );
  }

  getPersonList(): any {
    this.personList = [];
    if (!this.key) return;
    let params = { keyWords: this.key };
    this.isLoading = true;
    this.unitProvider.getOtherUnitUsersList(params).subscribe(
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

  goAddresslistUnit(org) {
    this.navCtrl.push(AddresslistOtherPage, {
      org: org
    });
  }

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

  search() {
    this.getUnitList();
    this.getPersonList();
  }

  goBack() {
    this.navCtrl.pop();
  }

}
