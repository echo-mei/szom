import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, Content, ToastController, Events } from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { MenuProvider } from '../../providers/menu/menu';
import { StatusBar } from '../../../node_modules/@ionic-native/status-bar';
import { AddresslistSearchPage } from '../addresslist-search/addresslist-search';
import { AddresslistNewPage } from '../addresslist-new/addresslist-new';
import { AddresslistOtherPage } from '../addresslist-other/addresslist-other';
import { AddresslistUnitPage } from '../addresslist-unit/addresslist-unit';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';
import { EVENT_NAMES } from '../../providers/event/event';
import { BzInfoPage } from '../bz-info/bz-info';
import { BzUserInfoPage } from '../bz-user-info/bz-user-info';

@Component({
  selector: 'page-addresslist',
  templateUrl: 'addresslist.html',
})
export class AddresslistPage {

  @ViewChild('content') content: Content;

  // 字母表
  groups: string[];
  // 好友列表
  friendList: {
    key: string,
    list: any[]
  }[];
  // 是否正在加载
  isLoading: boolean;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public navCtrl: NavController,
    public navParams: NavParams,
    public addresslistProvider: AddresslistProvider,
    public userProvider: UserProvider,
    public storage: StorageProvider,
    public menuProvider: MenuProvider,
    public toastCtrl: ToastController,
    public events: Events
  ) {
    this.initAlpha();
    this.initFriendList();
  }

  ionViewDidLoad() {
    this.events.subscribe(EVENT_NAMES.AGREE_ATTENTION, this.initFriendList.bind(this));
    this.events.subscribe(EVENT_NAMES.CANCEL_ATTENTION, this.initFriendList.bind(this));
  }

  ionViewWillUnload() {
    this.events.unsubscribe(EVENT_NAMES.AGREE_ATTENTION, this.initFriendList.bind(this));
    this.events.unsubscribe(EVENT_NAMES.CANCEL_ATTENTION, this.initFriendList.bind(this));
  }

  // ============================ Public Methods ================================

  // 初始化字母表
  initAlpha() {
    this.groups = [];
    for (var i = 0; i < 26; i++) {
      this.groups.push(String.fromCharCode((65 + i)));
    }
  }

  // 初始化关注列表
  initFriendList() {
    this.isLoading = true;
    this.friendList = [];
    this.addresslistProvider.getMyFriendsList().subscribe(
      data => {
        this.isLoading = false;
        for (let key in data) {
          this.friendList.push({
            key: key,
            list: data[key]
          });
        }
      },
      err => {
        this.isLoading = false;
      }
    );
  }

  // ============================ Events ================================

  // 跳转到搜索已关注列表
  goAddresslistSearch() {
    this.navCtrl.push(AddresslistSearchPage);
  }

  // 跳转到新的关注
  goAddresslistNew() {
    this.storage.newAttention && this.addresslistProvider.updateToViewed().subscribe(() => {
      this.storage.newAttention = null;
    });
    this.navCtrl.push(AddresslistNewPage, {
      onChange: this.initFriendList.bind(this)
    });
  }

  // 跳转到其他组织列表
  goAddresslistOther() {
    this.navCtrl.push(AddresslistOtherPage, {
      canSearch: true
    });
  }

  // 跳转到本单位列表
  goAddresslistUnit() {
    this.navCtrl.push(AddresslistUnitPage, {
      org: {
        organizationId: this.storage.me.orgId,
        orgName: this.storage.me.orgName
      },
      canSearch: true
    });
  }

  // 跳转到用户信息
  goUserInfo(user) {
    if (user.userType === "02") {//班子信息
      if (user.userCode == this.storage.me.userCode) {
        this.navCtrl.push(BzInfoPage);
      } else {
        this.navCtrl.push(BzUserInfoPage, {
          user: user,
          followOrCancel: true,
          onFollow: this.initFriendList.bind(this),
          onCancelFollow: this.initFriendList.bind(this),
          onAgree: this.initFriendList.bind(this),
          onRefuse: this.initFriendList.bind(this),
        });
      }
    } else {
      if (user.userCode == this.storage.me.userCode) {
        this.navCtrl.push(MeInfoPage);
      } else {
        this.navCtrl.push(UserInfoPage, {
          user: user,
          followOrCancel: true,
          showSelfInfo: true,
          showDaily: true,
          showTags: true,
          onFollow: this.initFriendList.bind(this),
          onCancelFollow: this.initFriendList.bind(this),
          onAgree: this.initFriendList.bind(this),
          onRefuse: this.initFriendList.bind(this),
        });
      }
    }
  }

  // 点击字母
  goGroup(key) {
    this.toastCtrl.create({
      cssClass: 'mini',
      message: key,
      position: 'middle',
      duration: 500
    }).present();
    if (document.getElementById(key)) {
      this.content.scrollTo(0, document.getElementById(key).offsetTop, 20);
    }
  }

}
