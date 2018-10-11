import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UnitProvider } from '../../providers/unit/unit';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { LeaderInfoLibUnitPage } from '../leader-info-lib-unit/leader-info-lib-unit';
import { LeaderInfoPage } from '../leader-info/leader-info';

/**
 * Generated class for the LeaderInfoLibSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-leader-info-lib-search',
  templateUrl: 'leader-info-lib-search.html',
})
export class LeaderInfoLibSearchPage {
  @ViewChild('searchEle') searchEle;

  key: string;

  unitList: any[];
  personKeyList: any = [];
  personValueList: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public unitProvider: UnitProvider,
              public storage: StorageProvider,
              public userProvider: UserProvider
            ) {
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
    this.unitProvider.getChildOrgList(params).subscribe(
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

  goLeaderInfoLibUnit(unit) {
    this.navCtrl.push(LeaderInfoLibUnitPage, {
      org: unit
    });
  }

  goUserInfo(user): any {
    this.navCtrl.push(LeaderInfoPage, {
      user: user
    });
  }

  search() {
    this.getUnitList();
    this.getPersonList();
  }

  goBack() {
    this.navCtrl.pop();
  }
}
