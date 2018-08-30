import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UnitProvider } from '../../providers/unit/unit';
import { AddresslistUnitPage } from '../addresslist-unit/addresslist-unit';
import { AddresslistOtherSearchPage } from '../addresslist-other-search/addresslist-other-search';
import { UserProvider } from '../../providers/user/user';
import { MeInfoPage } from '../me-info/me-info';
import { StorageProvider } from '../../providers/storage/storage';
import { UserInfoPage } from '../user-info/user-info';

@Component({
  selector: 'page-addresslist-other',
  templateUrl: 'addresslist-other.html',
})
export class AddresslistOtherPage {

  canSearch: boolean;

  org: any;
  organizationlist = [];
  personKeyList: any = [];
  personValueList: any = [];

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
    if(this.org) {
      this.unitProvider.getChildOrgList({organizationId: this.org.organizationId}).subscribe(
        (list) => {
          this.organizationlist = list;
        }
      );
    }else {
      this.unitProvider.getOtherUnitList().subscribe(
        (list) => {
          this.organizationlist = list;
        }
      );
    }
  }

  getPersonList() {
    if(this.org&&this.org.orgType) {
      this.unitProvider.getOrgPersonList({
        organizationId: this.org.organizationId,
        orgType: this.org.orgType
      }).subscribe(
        (list) => {
          for(let key in list) {
            this.personKeyList.push(key);
            this.personValueList.push(list[key]);
          }
        }
      );
    }
  }

  goUserInfo(user): any {
    if(user.userCode==JSON.parse(this.storage.get('user')).userCode) {
      this.navCtrl.push(MeInfoPage);
    }else {
      this.navCtrl.push(UserInfoPage, {
        user: user,
        followOrCancel: true,
        showSelfInfo: true,
        showDaily: true,
        showTags: true
      });
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
