import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UnitProvider } from '../../providers/unit/unit';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { LeaderInfoLibSearchPage } from '../leader-info-lib-search/leader-info-lib-search';
import { LeaderInfoPage } from '../leader-info/leader-info';

@Component({
  selector: 'page-leader-info-lib-unit',
  templateUrl: 'leader-info-lib-unit.html',
})
export class LeaderInfoLibUnitPage {
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
    this.org = this.navParams.get('org');
    this.getUnitList();
    this.getPersonList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderInfoLibUnitPage');
  }

  getUnitList(): any {
    this.unitProvider.getChildOrgList({organizationId: this.org.organizationId}).subscribe(
      (list) => {
        list.length && (this.unitList = list);
      }
    );
  }

  getPersonList(): any {
    if(this.org.orgType) {
      this.unitProvider.getOrgPersonList({
        organizationId: this.org.organizationId,
        orgType: this.org.orgType,
        userType:"01"
      }).subscribe(
        (list) => {
          this.personList = list;
        }
      );
    }
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

  goLeaderInfoLibSearch() {
    this.navCtrl.push(LeaderInfoLibSearchPage);
  }
}
