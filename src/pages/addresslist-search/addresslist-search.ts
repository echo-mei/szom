import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UnitProvider } from '../../providers/unit/unit';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { BzUserInfoPage } from '../bz-user-info/bz-user-info';
import { BzInfoPage } from '../bz-info/bz-info';

@Component({
  selector: 'page-addresslist-search',
  templateUrl: 'addresslist-search.html',
})
export class AddresslistSearchPage {

  @ViewChild('searchEle') searchEle;

  // 列表发生变化后置
  onChange: any;

  // 关键字
  key: string = '';
  // 好友列表
  friendList: {
    key: string,
    list: any[]
  }[] = [];
  // 好友列表是否正在加载
  isFriendLoading: boolean;
  // 列表数据是否已经发生变化
  hasChanged: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public unitProvider: UnitProvider,
    public userProvider: UserProvider,
    public storage: StorageProvider,
    public addresslistProvider: AddresslistProvider
  ) {
    this.onChange = this.navParams.get('onChange');
  }

  ionViewWillUnload() {
    this.hasChanged && this.onChange && this.onChange();
  }

  // ============== Public Methods ==================

  // 获取人员列表
  getPersonList(): any {
    this.friendList = [];
    if (!this.key) return;
    let params = { keyWords: this.key };
    this.isFriendLoading = true;
    this.addresslistProvider.getMyFriendsList(params).subscribe(
      (data) => {
        this.isFriendLoading = false;
        for (let key in data) {
          this.friendList.push({
            key: key,
            list: data[key]
          });
        }
      },
      err => {
        this.isFriendLoading = false;
      }
    );
  }

  // 改变列表数据
  changeData() {
    this.hasChanged = true;
    this.getPersonList();
  }

  // =================== Events =======================

  // 跳转到人员信息
  goUserInfo(user): any {
    if (user.userType === "02") {//班子信息
      if (user.userCode == this.storage.me.userCode) {
        this.navCtrl.push(BzInfoPage);
      } else {
        this.navCtrl.push(BzUserInfoPage, {
          user: user,
          followOrCancel: true,
          onCancelFollow: this.changeData.bind(this)
        });
      }
    } else {
      if (user.userCode == this.storage.me.userCode) {
        this.navCtrl.push(MeInfoPage, { user: user });
      } else {
        this.navCtrl.push(UserInfoPage, {
          user: user,
          followOrCancel: true,
          showSelfInfo: true,
          showDaily: true,
          showTags: true,
          onCancelFollow: this.changeData.bind(this)
        });
      }
    }
  }

  // 搜索
  search() {
    this.getPersonList();
  }

  // 返回
  goBack() {
    this.navCtrl.pop();
  }

}
