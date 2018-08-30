import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UnitProvider } from '../../providers/unit/unit';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { AddresslistUnitPage } from '../addresslist-unit/addresslist-unit';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { AddresslistOtherPage } from '../addresslist-other/addresslist-other';

@Component({
  selector: 'page-addresslist-other-search',
  templateUrl: 'addresslist-other-search.html',
})
export class AddresslistOtherSearchPage {

  @ViewChild('searchEle') searchEle;

  key: string;

  unitList: any[] = [];
  personKeyList: any = [];
  personValueList: any = [];

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
      this.searchEle.setFocus();
    }, 150);
  }


  getUnitList(): any {
    let params = {};
    if (this.key) {
      params['keyWords'] = this.key;
    }else  {
      return;
    }
    this.unitProvider.getOtherUnitOrgsList(params).subscribe(
      (list) => {
        this.unitList = list;
      }
    );
  }

  getPersonList(): any {
    let params = {};
    if (this.key) {
      params['keyWords'] = this.key;
    }else  {
      return;
    }
    this.unitProvider.getOtherUnitUsersList(params).subscribe(
      (data) => {
        this.personKeyList = [];
        this.personValueList = [];
        for(let key in data) {
          this.personKeyList.push(key);
          this.personValueList.push(data[key]);
        }
      }
    );
  }

  goAddresslistUnit(org) {
    this.navCtrl.push(AddresslistOtherPage, {
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
    this.getUnitList();
    this.getPersonList();
  }

  goBack() {
    this.navCtrl.pop();
  }

}
