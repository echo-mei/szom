import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UnitProvider } from '../../providers/unit/unit';

@IonicPage()
@Component({
  selector: 'page-addresslist-other',
  templateUrl: 'addresslist-other.html',
})
export class AddresslistOtherPage {

  organizationlist = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public unitProvider: UnitProvider
  ) {
    this.getOrgList();
  }

  getOrgList() {
    this.unitProvider.getOtherUnitList().subscribe(
      (list) => {
        this.organizationlist = list;
      }
    );
  }

  goAddresslistUnit(org) {
    this.navCtrl.push('AddresslistUnitPage', {
      org: org
    });
  }
}
