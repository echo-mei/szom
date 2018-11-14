import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-user-baseinfo',
  templateUrl: 'user-baseinfo.html',
})
export class UserBaseinfoPage {

  @Input() user: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public statusBar: StatusBar
  ) {
  }

  ngOnInit() {
    Object.assign(this, this.navParams.data);
    this.getUserBaseInfo();
  }

  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  ionViewWillLeave() {
    this.statusBar.styleDefault();
  }

  // 获取用户基本信息
  getUserBaseInfo() {
    this.userProvider.getUserInfoByPersonId(this.user.personId).subscribe(
      (user) => {
        this.user = user;
      }
    );
  }
}
