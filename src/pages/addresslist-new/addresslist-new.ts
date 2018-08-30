import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';
import { AddresslistNewSearchPage } from '../addresslist-new-search/addresslist-new-search';

@Component({
  selector: 'page-addresslist-new',
  templateUrl: 'addresslist-new.html',
})
export class AddresslistNewPage {

  // 最近分组
  list1: any[] = [];
  // 一周前分组
  list2: any[] = [];


  onFollow: () => {};
  onCancelFollow: () => {};
  onAgree: () => {};
  onRefuse: () => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public addresslistProvider: AddresslistProvider,
    public dateUtil: DateUtilProvider,
    public storage: StorageProvider,
    public userProvider: UserProvider
  ) {
    this.initUserList();
  }

  initUserList() {
    this.list1 = [];
    this.list2 = [];
    this.getUserList();
  }

  goAddresslistNewSearch() {
    this.navCtrl.push(AddresslistNewSearchPage);
  }

  getUserList() {
    this.addresslistProvider.getNewFollowUserList().subscribe(
      (data) => {
        data.forEach((user) => {
          if(user.updateDate.time > (new Date().getTime()-7*24*60*60*1000)) {
            this.list1.push(user);
          }else {
            this.list2.push(user);
          }
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
        followOrCancel: !(user.status=='01'&&user.applyType=='get') ? true : false,
        agreeOrRefuse: user.status=='01'&&user.applyType=='get' ? true : false,
        showSelfInfo: true,
        showDaily: true,
        showTags: true,
        onFollow: () => {
          this.initUserList();
          this.onFollow && this.onFollow();
        },
        onCancelFollow: () => {
          this.initUserList();
          this.onCancelFollow && this.onCancelFollow();
        },
        onAgree: () => {
          this.initUserList();
          this.onAgree && this.onAgree();
        },
        onRefuse: () => {
          this.initUserList();
          this.onRefuse && this.onRefuse();
        }
      });
    }
  }

}
