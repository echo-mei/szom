import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HeavyFocusProvider } from '../../providers/heavy-focus/heavy-focus';
import { HeavyFocusUnitPage } from '../heavy-focus-unit/heavy-focus-unit';
import { HeavyFocusAddSearchPage } from '../heavy-focus-add-search/heavy-focus-add-search';
import { UnitProvider } from '../../providers/unit/unit';


@Component({
  selector: 'page-heavy-focus-add',
  templateUrl: 'heavy-focus-add.html',
})
export class HeavyFocusAddPage {

  // 组织机构列表
  organizationlist = [];

  onEmpFollow: () => {};
  onUnEmpFollow: () => {};

  constructor(public navCtrl: NavController,
    public unitProvider: UnitProvider,
    public navParams: NavParams) {
    this.onEmpFollow = this.navParams.get("onEmpFollow");
    this.onUnEmpFollow = this.navParams.get("onUnEmpFollow");
    this.getOrgList();
  }
  // ============================ Public Methods ==================================
  // 获取单位列表
  getOrgList() {
    this.unitProvider.getAllUnitOrgsList().subscribe(
      (list) => {
        this.organizationlist = list;
      }
    );
  }

  // ============================ Events ==================================
  // 点击机构
  onClickOrg(org) {
    this.navCtrl.push(HeavyFocusUnitPage, {
      org: org,
      onEmpFollow: ()=>{this.onEmpFollow()},
      onUnEmpFollow: ()=>{this.onUnEmpFollow()}
    })
  }

  // 点击搜索
  onClickSearch() {
    this.navCtrl.push(HeavyFocusAddSearchPage, {
      onEmpFollow: ()=>{this.onEmpFollow()},
      onUnEmpFollow: ()=>{this.onUnEmpFollow()}
    })
  }

}
