import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';
import { AddresslistNewSearchPage } from '../addresslist-new-search/addresslist-new-search';
import { BzInfoPage } from '../bz-info/bz-info';
import { BzUserInfoPage } from '../bz-user-info/bz-user-info';

@Component({
  selector: 'page-addresslist-new',
  templateUrl: 'addresslist-new.html',
})
export class AddresslistNewPage {

  // 列表发生变化后置
  onChange: any;

  // 最近分组
  list1: any[] = [];
  // 一周前分组
  list2: any[] = [];
  // 列表数据是否已经发生变化
  hasChanged: boolean;
  // 是否正在加载
  isLoading: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public addresslistProvider: AddresslistProvider,
    public dateUtil: DateUtilProvider,
    public storage: StorageProvider,
    public userProvider: UserProvider
  ) {
    this.onChange = this.navParams.get('onChange');
    this.initUserList();
  }

  ionViewWillUnload() {
    this.hasChanged && this.onChange && this.onChange();
  }

  // ===================== Public Methods ==============================

  // 初始化用户列表
  initUserList() {
    this.isLoading = true;
    this.list1 = [];
    this.list2 = [];
    this.addresslistProvider.getNewFollowUserList().subscribe(
      data => {
        this.isLoading = false;
        data.forEach((user) => {
          if (user.updateDate.time > (new Date().getTime() - 7 * 24 * 60 * 60 * 1000)) {
            this.list1.push(user);
          } else {
            this.list2.push(user);
          }
        });
      },
      err => {
        this.isLoading = false;
      }
    );
  }

  // 改变列表数据
  changeData() {
    this.hasChanged = true;
    this.initUserList();
  }

  // ======================== Events ==============================

  // 跳转到新的关注搜索
  goAddresslistNewSearch() {
    this.navCtrl.push(AddresslistNewSearchPage, {
      onChange: this.onChange.bind(this)
    });
  }

  // 跳转到用户详情
  goUserInfo(user) {
    if (user.userType === "02") {//班子信息
      if (user.userCode == this.storage.me.userCode) {
        this.navCtrl.push(BzInfoPage);
      } else {
        this.navCtrl.push(BzUserInfoPage, {
          user: user,
          followOrCancel: !(user.status == '01' && user.applyType == 'get') ? true : false,
          agreeOrRefuse: (user.status == '01' && user.applyType == 'get') ? true : false,
          onFollow: this.changeData.bind(this),
          onCancelFollow: this.changeData.bind(this),
          onAgree: this.changeData.bind(this),
          onRefuse: this.changeData.bind(this)
        });
      }
    } else {
      if (user.userCode == this.storage.me.userCode) {
        this.navCtrl.push(MeInfoPage);
      } else {
        this.navCtrl.push(UserInfoPage, {
          user: user,
          followOrCancel: !(user.status == '01' && user.applyType == 'get') ? true : false,
          agreeOrRefuse: (user.status == '01' && user.applyType == 'get') ? true : false,
          showSelfInfo: true,
          showDaily: true,
          showTags: true,
          onFollow: this.changeData.bind(this),
          onCancelFollow: this.changeData.bind(this),
          onAgree: this.changeData.bind(this),
          onRefuse: this.changeData.bind(this)
        });
      }
    }
  }

}
