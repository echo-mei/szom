import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, Content, ToastController } from 'ionic-angular';
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

@Component({
  selector: 'page-addresslist',
  templateUrl: 'addresslist.html',
})
export class AddresslistPage {

  @ViewChild('content') content: Content;

  groups = [];

  friendKeyList: any = [];
  friendValueList: any = [];

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public navCtrl: NavController,
    public navParams: NavParams,
    public addresslistProvider: AddresslistProvider,
    public userProvider: UserProvider,
    public storage: StorageProvider,
    public menuProvider: MenuProvider,
    public toastCtrl: ToastController
  ) {
    for(var i=0; i<26; i++) {
      this.groups.push(String.fromCharCode((65+i)));
    }
  }

  ionViewDidEnter() {
    this.getFriendList();
  }

  initFriendList() {
    this.friendKeyList = [];
    this.friendValueList = [];
    this.getFriendList();
  }

  getFriendList() {
    this.addresslistProvider.getMyFriendsList().subscribe(
      (data) => {
        this.friendKeyList = [];
        this.friendValueList = [];
        for(let key in data) {
          this.friendKeyList.push(key);
          this.friendValueList.push(data[key]);
        }
      }
    );
  }

  goAddresslistSearch() {
    this.navCtrl.push(AddresslistSearchPage);
  }

  goAddresslistNew() {
    this.navCtrl.push(AddresslistNewPage, {
      onFollow: this.getFriendList.bind(this),
      onCancelFollow: this.getFriendList.bind(this),
      onAgree: this.getFriendList.bind(this),
      onRefuse: this.getFriendList.bind(this)
    });
  }

  goAddresslistOther() {
    this.navCtrl.push(AddresslistOtherPage, {
      canSearch: true
    });
  }

  goAddresslistUnit() {
    this.userProvider.getMe().subscribe(
      (me) => {
        this.navCtrl.push(AddresslistUnitPage, {
          org: {
            organizationId: me.unitId,
            orgName: me.unitName
          },
          canSearch: true
        });
      }
    );
  }

  goUserInfo(user) {
    if(user.userCode==JSON.parse(this.storage.get('user')).userCode) {
      this.navCtrl.push(MeInfoPage);
    }else {
      this.navCtrl.push(UserInfoPage, {
        user: user,
        followOrCancel: true,
        // showBaseInfo: true,
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

  goGroup(id) {
    this.toastCtrl.create({
      cssClass: 'mini',
      message: id,
      position: 'middle',
      duration: 500
    }).present();
    if(document.getElementById(id)) {
      this.content.scrollTo(0, document.getElementById(id).offsetTop, 20);
    }
  }

}
