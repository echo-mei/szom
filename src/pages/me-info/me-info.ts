import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, DateTime, PopoverController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { ImpressionProvider } from '../../providers/impression/impression';
import { SignProvider } from '../../providers/sign/sign';

@IonicPage()
@Component({
  selector: 'page-me-info',
  templateUrl: 'me-info.html',
})
export class MeInfoPage {

  onSign: () => {};

  todaySign: any;
  personInfo = 'baseInfo';
  me: any = {};
  selfInfo = {};
  startDate: any;
  endDate: any;
  tagList: any[] = [];

  startTime: string;
  endTime: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageProvider,
    public userProvider: UserProvider,
    public actionSheetCtrl: ActionSheetController,
    public dateUtil: DateUtilProvider,
    public impressionProvider: ImpressionProvider,
    public signProvider: SignProvider,
    public popoverCtrl: PopoverController
  ) {
    this.onSign = this.navParams.get('onSign');
    let date = new Date();
    this.startDate = date.toISOString();
    this.endDate = date.toISOString();
    this.getMe();
  }

  getMe() {
    this.userProvider.getMe().subscribe(
      me => {
        this.me = me;
        this.getSelfInfo();
        this.getTodaySign();
        this.getImpressionList();
      }
    );
  }

  getTodaySign() {
    let params = {
      userCode: JSON.parse(this.storage.get('user')).userCode
    }
    this.signProvider.getTodaySign(params).subscribe(
      (data) => {
        this.todaySign = data;
      }
    );
  }

  goSignTags() {
    let popover = this.popoverCtrl.create('SignTagsPage', {
      onSign: () => {
        this.getTodaySign();
        this.onSign && this.onSign();
      }
    }, {
      cssClass: 'auto'
    });
    popover.present();
  }

  goMeSign() {
    let popover = this.popoverCtrl.create('SignDatePage', {
      onSign: () => {
        this.getTodaySign();
        this.onSign && this.onSign();
      }
    }, {
      cssClass: 'large'
    });
    popover.present();
  }

  getSelfInfo() {
    this.userProvider.getUserSelfInfo(this.me.personId).subscribe(
      selfInfo => {
        this.selfInfo = selfInfo;
      }
    );
  }

  // 获取用户标签列表
  getImpressionList() {
    let params = {tagOwner: this.me.userCode};
    this.startTime && (params['startDate'] = this.startTime);
    this.endTime && (params['endDate'] = this.endTime);
    this.impressionProvider.statistics(params).subscribe(
      (list) => {
        this.tagList = list;
      }
    );
  }

  goMeUpdateZS(title, attr, user) {
    this.navCtrl.push('MeUpdateZsPage', {
      title: title,
      attr: attr,
      user: this.me,
      selfInfo: this.selfInfo,
      onUpdate: this.getSelfInfo.bind(this)
    });
  }

  goDailyList() {
    this.navCtrl.push('DailyMePage');
  }

}
