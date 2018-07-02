import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, DateTime } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { ImpressionProvider } from '../../providers/impression/impression';

@IonicPage()
@Component({
  selector: 'page-me-info',
  templateUrl: 'me-info.html',
})
export class MeInfoPage {

  startDate: any;
  endDate: any;

  personInfo = 'selfInfo';

  me: any = {};

  selfInfo = {};

  constructor(
    public navCtrl: NavController,
    public storage: StorageProvider,
    public userProvider: UserProvider,
    public actionSheetCtrl: ActionSheetController,
    public dateUtil: DateUtilProvider,
    public impressionProvider: ImpressionProvider
  ) {
    let date = new Date();
    this.startDate = date.toISOString();
    this.endDate = date.toISOString();
    this.getMe();
    this.getSelfInfo();
  }

  getMe() {
    this.userProvider.getMe().subscribe(
      me => {
        this.me = me;
      }
    );
  }

  getSelfInfo() {
    this.userProvider.getMySelfInfo().subscribe(
      selfInfo => {
        this.selfInfo = selfInfo;
      }
    );
  }

  goMeUpdateZS(title, attr, user) {
    this.navCtrl.push('MeUpdateZsPage', {
      title: title,
      attr: attr,
      user: this.selfInfo
    });
  }

}
