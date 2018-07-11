import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-addresslist-new',
  templateUrl: 'addresslist-new.html',
})
export class AddresslistNewPage {

  todayUserList: any[] = [];
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
    public storage: StorageProvider
  ) {
    this.initUserList();
  }

  initUserList() {
    this.todayUserList = [];
    this.monthUserList = [];
    this.getUserList();
  }

  getUserList() {
    this.addresslistProvider.getNewFollowUserList().subscribe(
      (data) => {
        let now = new Date();
        data.forEach((user) => {
          if(this.dateUtil.isSameDay(new Date(user.createDate.time), now)) {
            this.todayUserList.push(user);
          }else {
            this.monthUserList.push(user);
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
