import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UnitProvider } from '../../providers/unit/unit';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-addresslist-unit',
  templateUrl: 'addresslist-unit.html',
})
export class AddresslistUnitPage {

  org: any;

  unitList: any[];
  personKeyList: any = [];
  personValueList: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public unitProvider: UnitProvider,
    public storage: StorageProvider,
    public userProvider: UserProvider
  ) {
    this.org = this.navParams.get('org');
    this.getUnitList();
    this.getPersonList();
  }

  getUnitList(): any {
    this.unitProvider.getChildOrgList({organizationId: this.org.organizationId}).subscribe(
      (list) => {
        this.unitList = list;
      }
    );
  }

  getPersonList(): any {
    if(this.org.orgType) {
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

  goAddresslistUnit(unit) {
    this.navCtrl.push('AddresslistUnitPage', {
      org: unit
    });
  }

  goUserInfo(user): any {
    if(user.userCode==JSON.parse(this.storage.get('user')).userCode) {
      this.navCtrl.push('MeInfoPage');
    }else {
      this.navCtrl.push('UserInfoPage', {
        user: user,
        followOrCancel: true,
        showSelfInfo: true,
        showDaily: true,
        showTags: true
      });
    }
  }
}
