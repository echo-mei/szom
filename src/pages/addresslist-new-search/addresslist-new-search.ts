import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Searchbar } from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { MeInfoPage } from '../me-info/me-info';
import { UserInfoPage } from '../user-info/user-info';
import { BzUserInfoPage } from '../bz-user-info/bz-user-info';
import { BzInfoPage } from '../bz-info/bz-info';

@Component({
  selector: 'page-addresslist-new-search',
  templateUrl: 'addresslist-new-search.html',
})
export class AddresslistNewSearchPage {

  @ViewChild('searchEle') searchEle: Searchbar;

  // 列表发生变化后置
  onChange: any;

  // 关键字
  key: string = '';
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
    // this.resetUserList();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.searchEle.setFocus();
    }, 150);
  }

  ionViewWillUnload() {
    this.hasChanged && this.onChange && this.onChange();
  }

  // ========================= Public Methods ============================

  // 重置用户列表
  resetUserList() {
    this.list1 = [];
    this.list2 = [];
    if (!this.key) return;
    let params = {
      keyWords: this.key
    };
    this.isLoading = true;
    this.addresslistProvider.getNewFollowUserList(params).subscribe(
      (data) => {
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
    this.resetUserList();
  }

  // =========================== Events ======================================

  // 搜索
  search() {
    this.resetUserList();
  }

  // 取消（返回）
  goBack() {
    this.navCtrl.pop();
  }

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
