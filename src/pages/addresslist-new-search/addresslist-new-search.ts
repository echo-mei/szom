import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';

@Component({
  selector: 'page-addresslist-new-search',
  templateUrl: 'addresslist-new-search.html',
})
export class AddresslistNewSearchPage {

  @ViewChild('searchEle') searchEle;

  key: string;

  todayUserList: any[] = [];
  weekUserList: any[] = [];
  monthUserList: any[] = [];

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
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.searchEle.setFocus();
    }, 150);
  }

  search() {
    this.getUserList();
  }

  goBack() {
    this.navCtrl.pop();
  }

  getUserList() {
    this.todayUserList = [];
    this.weekUserList = [];
    this.monthUserList = [];
    let params = {};
    if (this.key) {
      params['keyWords'] = this.key;
    }else {
      return;
    }
    this.addresslistProvider.getNewFollowUserList(params).subscribe(
      (data) => {
        let now = new Date();
        data.forEach((user) => {
          if(this.dateUtil.isSameDay(new Date(user.updateDate.time), now)) {
            this.todayUserList.push(user);
          }else if(user.updateDate.time > (new Date().getTime()+24*60*60*1000) && user.updateDate.time < (new Date().getTime()+7*24*60*60*1000)) {
            this.weekUserList.push(user);
          }else {
            this.monthUserList.push(user);
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
          this.getUserList();
          this.onFollow && this.onFollow();
        },
        onCancelFollow: () => {
          this.getUserList();
          this.onCancelFollow && this.onCancelFollow();
        },
        onAgree: () => {
          this.getUserList();
          this.onAgree && this.onAgree();
        },
        onRefuse: () => {
          this.getUserList();
          this.onRefuse && this.onRefuse();
        }
      });
    }
  }

}
