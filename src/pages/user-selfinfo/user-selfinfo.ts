import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-user-selfinfo',
  templateUrl: 'user-selfinfo.html',
})
export class UserSelfinfoPage {

  @Input() user: any = {};

  userSelfInfo: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public statusBar: StatusBar
  ) {
  }

  ngOnInit() {
    Object.assign(this, this.navParams.data);
    this.getUserSelfInfo();
  }

  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  ionViewWillLeave() {
    this.statusBar.styleDefault();
  }

  // 获取用户自述信息
  getUserSelfInfo() {
    this.userProvider.getUserSelfInfo(this.user.personId).subscribe(
      (data) => {
        this.userSelfInfo = data;
      }
    );
  }

}
