import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UnitProvider } from '../../providers/unit/unit';
import { AddresslistOtherSearchPage } from '../addresslist-other-search/addresslist-other-search';
import { UserProvider } from '../../providers/user/user';
import { MeInfoPage } from '../me-info/me-info';
import { StorageProvider } from '../../providers/storage/storage';
import { UserInfoPage } from '../user-info/user-info';
import { BzInfoPage } from '../bz-info/bz-info';
import { BzUserInfoPage } from '../bz-user-info/bz-user-info';

@Component({
  selector: 'page-addresslist-other',
  templateUrl: 'addresslist-other.html',
})
export class AddresslistOtherPage {

  canSearch: boolean;

  org: any;
  organizationlist = [];
  personList: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public unitProvider: UnitProvider,
    public userProvider: UserProvider,
    public storage: StorageProvider
  ) {
    this.canSearch = this.navParams.get('canSearch');
    this.org = this.navParams.get('org');
    this.getOrgList();
    this.getPersonList();
  }

  getOrgList() {
    if (this.org) {
      this.unitProvider.getOtherChildOrgList({ organizationId: this.org.organizationId }).subscribe(
        (list) => {
          this.organizationlist = list;
        }
      );
    } else {
      this.unitProvider.getOtherUnitList().subscribe(
        (list) => {
          this.organizationlist = list;
        }
      );
    }
  }

  getPersonList() {
    if (this.org && this.org.orgType) {
      this.unitProvider.getOrgPersonList({
        organizationId: this.org.organizationId,
        orgType: this.org.orgType
      }).subscribe(
        (list) => {
          this.personList = list;
        }
      );
    }
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

  goAddresslistUnit(org) {
    this.navCtrl.push(AddresslistOtherPage, {
      org: org
    });
  }

  goAddresslistOtherSearch() {
    this.navCtrl.push(AddresslistOtherSearchPage);
  }
}
