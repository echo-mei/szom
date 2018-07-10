import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-addresslist',
  templateUrl: 'addresslist.html',
})
export class AddresslistPage {

  friendKeyList: any = [];
  friendValueList: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public addresslistProvider: AddresslistProvider,
    public userProvider: UserProvider,
    public storage: StorageProvider
  ) {
    this.getFriendList();
  }

  getFriendList() {
    this.addresslistProvider.getMyFriendsList().subscribe(
      (data) => {
        for(let key in data) {
          this.friendKeyList.push(key);
          this.friendValueList.push(data[key]);
        }
      }
    );
  }

  goAddresslistSearch() {
    this.navCtrl.push('AddresslistSearchPage');
  }

  goAddresslistNew() {
    this.navCtrl.push('AddresslistNewPage');
  }

  goAddresslistOther() {
    this.navCtrl.push('AddresslistOtherPage');
  }

  goAddresslistUnit() {
    this.userProvider.getMe().subscribe(
      (me) => {
        this.navCtrl.push('AddresslistUnitPage', {
          org: {
            organizationId: me.unitId,
            orgName: me.orgName
          }
        });
      }
    );
  }

  goUserInfo(user) {
    if(user.userCode==JSON.parse(this.storage.get('user')).userCode) {
      this.navCtrl.push('MeInfoPage');
    }else {
      this.navCtrl.push('UserInfoPage', {
        user: user,
        followOrCancel: true,
        showSelfInfo: true,
        showDaily: true,
        showTags: true,
        onFollow: this.getFriendList.bind(this),
        onCancelFollow: this.getFriendList.bind(this),
        onAgree: this.getFriendList.bind(this),
        onRefuse: this.getFriendList.bind(this),
      });
    }
  }

}
