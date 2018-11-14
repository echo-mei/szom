import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HeavyFocusProvider } from '../../providers/heavy-focus/heavy-focus';
import { HeavyFocusUnitPage } from '../heavy-focus-unit/heavy-focus-unit';
import { LeaderInfoPage } from '../leader-info/leader-info';
import { BzInfoLibShowPage } from '../bz-info-lib-show/bz-info-lib-show';
import { UserProvider } from '../../providers/user/user';


@Component({
  selector: 'page-heavy-focus-add-search',
  templateUrl: 'heavy-focus-add-search.html',
})
export class HeavyFocusAddSearchPage {
  @ViewChild('searchEle') searchEle;

  // 搜索关键字
  key: string = "";

  // 组织机构列表
  organizationlist = [];
  // 人员列表
  personList: any[] = [];
  // 是否还在加载数据
  isLoading = false;

  onEmpFollow: () => {};
  onUnEmpFollow: () => {};

  constructor(public navCtrl: NavController,
    public heavyFocusProvider: HeavyFocusProvider,
    public userProvider:UserProvider,
    public navParams: NavParams) {
      this.onEmpFollow = this.navParams.get("onEmpFollow");
      this.onUnEmpFollow = this.navParams.get("onUnEmpFollow");
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.searchEle.setFocus();
    }, 150);
  }
  // ============================ Public Methods ==================================
  // 获取可以重点关注的人员所在单位列表
  getUnHeavyFocusUnitList() {
    let params = {
      keywords: this.key
    }
    this.heavyFocusProvider.getUnHeavyFocusUnitList(params).subscribe(
      list => {
        list.length && (this.organizationlist = list);
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      });
  }

  // 获取可以重点关注的人员列表
  getUnHeavyFocusPersonList() {
    let params = {
      keywords: this.key
    }

    this.heavyFocusProvider.getUnHeavyFocusPersonList(params).subscribe(
      list => {
        this.isLoading = false;
        this.personList = list;
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  // 返回上层页面
  goBack() {
    this.navCtrl.pop();
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

  // 点击人员
  onClickUser(user) {
    if (user.userType === "01") {//干部信息
      this.navCtrl.push(LeaderInfoPage, {
        user: user,
        onEmpFollow: ()=>{this.onEmpFollow()},
        onUnEmpFollow: ()=>{this.onUnEmpFollow()}
      });
    } else if (user.userType === "02") {//班子信息
      this.navCtrl.push(BzInfoLibShowPage, {
        user: user,
        empFollowOrCancel:true,
        onEmpFollow: ()=>{this.onEmpFollow()},
        onUnEmpFollow: ()=>{this.onUnEmpFollow()}
      });
    }
  }

  // 搜索
  search() {
    if(this.key){
      this.isLoading = true;
      this.organizationlist = [];
      this.personList = [];
      this.getUnHeavyFocusUnitList();
      this.getUnHeavyFocusPersonList();
    }else{
      this.organizationlist = [];
      this.personList = [];
    }
  }

  // 清空搜索
  clear() {
    this.key = "";
    this.organizationlist = [];
    this.personList = [];
  }
}
