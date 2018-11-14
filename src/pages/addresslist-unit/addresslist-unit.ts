import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UnitProvider } from '../../providers/unit/unit';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';
import { AddresslistUnitSearchPage } from '../addresslist-unit-search/addresslist-unit-search';
import { BzUserInfoPage } from '../bz-user-info/bz-user-info';
import { BzInfoPage } from '../bz-info/bz-info';

@Component({
  selector: 'page-addresslist-unit',
  templateUrl: 'addresslist-unit.html',
})
export class AddresslistUnitPage {

  canSearch: boolean;

  org: any;

  unitList: any = [];
  personList: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public unitProvider: UnitProvider,
    public storage: StorageProvider,
    public userProvider: UserProvider
  ) {
    this.canSearch = this.navParams.get('canSearch');
    this.org = this.navParams.get('org');
    this.getUnitList();
    this.getPersonList();
  }

  getUnitList(): any {
    this.unitProvider.getChildOrgList({ organizationId: this.org.organizationId }).subscribe(
      (list) => {
        list.length && (this.unitList = list);
      }
    );
  }

  getPersonList(): any {
    this.unitProvider.getOrgPersonList({
      organizationId: this.org.organizationId,
      orgType: this.org.orgType
    }).subscribe(
      (list) => {
        this.personList = list;
      }
    );
  }

  goAddresslistUnit(unit) {
    this.navCtrl.push(AddresslistUnitPage, {
      org: unit
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
        this.navCtrl.push(MeInfoPage);
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

  goAddresslistUnitSearch() {
    this.navCtrl.push(AddresslistUnitSearchPage);
  }
}
