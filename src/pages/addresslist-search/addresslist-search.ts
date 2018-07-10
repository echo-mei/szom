import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UnitProvider } from '../../providers/unit/unit';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-addresslist-search',
  templateUrl: 'addresslist-search.html',
})
export class AddresslistSearchPage {

  key: string;

  unitList: any[];
  personList: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public unitProvider: UnitProvider,
    public userProvider: UserProvider,
    public storage: StorageProvider
  ) {
    this.getUnitList();
    this.getPersonList();
  }

  getUnitList(): any {
    let params = {};
    if(this.key) {
      params['keyWords'] = this.key;
    }
    this.unitProvider.getOrgList(params).subscribe(
      (list) => {
        this.unitList = list;
      }
    );
  }

  getPersonList(): any {
    let params = {};
    if(this.key) {
      params['keyWords'] = this.key;
    }
    this.userProvider.getPersonList(params).subscribe(
      (list) => {
        this.personList = list;
      }
    );
  }

  goAddresslistUnit(org) {
    this.navCtrl.push('AddresslistUnitPage', {
      org: org
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

  search() {
    this.getUnitList();
    this.getPersonList();
  }

  goBack() {
    this.navCtrl.pop();
  }

}
