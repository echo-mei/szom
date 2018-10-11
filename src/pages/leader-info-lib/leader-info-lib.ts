import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UnitProvider } from '../../providers/unit/unit';
import { LeaderInfoLibSearchPage } from '../leader-info-lib-search/leader-info-lib-search';
import { LeaderInfoLibUnitPage } from '../leader-info-lib-unit/leader-info-lib-unit';

/**
 * Generated class for the LeaderInfoLibPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-leader-info-lib',
  templateUrl: 'leader-info-lib.html',
})
export class LeaderInfoLibPage {

  organizationlist = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public unitProvider: UnitProvider
  ) {
    this.getOrgList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderInfoLibPage');
  }

  getOrgList() {
    this.unitProvider.getAllUnitOrgsList().subscribe(
      (list) => {
        this.organizationlist = list;
      }
    );

  }

  goLeaderInfoLibUnit(org) {
    this.navCtrl.push(LeaderInfoLibUnitPage, {
      org: org
    });
  }

  goLeaderInfoLibSearch() {
    this.navCtrl.push(LeaderInfoLibSearchPage);
  }

}
