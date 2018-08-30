import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UnitProvider } from '../../providers/unit/unit';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { AddresslistUnitPage } from '../addresslist-unit/addresslist-unit';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';

@Component({
  selector: 'page-addresslist-search',
  templateUrl: 'addresslist-search.html',
})
export class AddresslistSearchPage {
  @ViewChild('searchEle') searchEle;

  key: string;

  unitList: any[] = [];
  friendKeyList: any = [];
  friendValueList: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public unitProvider: UnitProvider,
    public userProvider: UserProvider,
    public storage: StorageProvider,
    public addresslistProvider: AddresslistProvider
  ) {
    // this.getUnitList();
    // this.getPersonList();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.searchEle.setFocus();//为输入框设置焦点
    }, 150);
  }


  getUnitList(): any {
    let params = {};
    if (this.key) {
      params['keyWords'] = this.key;
    }
    this.unitProvider.getOrgList(params).subscribe(
      (list) => {
        this.unitList = list;
      }
    );
  }

  getPersonList(): any {
    this.friendKeyList = [];
    this.friendValueList = [];
    let params = {};
    if (this.key) {
      params['keyWords'] = this.key;
    }else  {
      return;
    }
    this.addresslistProvider.getMyFriendsList(params).subscribe(
      (data) => {
        for(let key in data) {
          this.friendKeyList.push(key);
          this.friendValueList.push(data[key]);
        }
      }
    );
  }

  goAddresslistUnit(org) {
    this.navCtrl.push(AddresslistUnitPage, {
      org: org
    });
  }

  goUserInfo(user): any {
    if (user.userCode == JSON.parse(this.storage.get('user')).userCode) {
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

  search() {
    // this.getUnitList();
    this.getPersonList();
  }

  goBack() {
    this.navCtrl.pop();
  }

}
