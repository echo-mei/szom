import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, PopoverController, Platform } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { SignProvider } from '../../providers/sign/sign';
import { StatusBar } from '@ionic-native/status-bar';
import { MenuProvider } from '../../providers/menu/menu';
import { DailyMePage } from '../daily-me/daily-me';
import { DailyOnePage } from '../daily-one/daily-one';
import { DailyThreePage } from '../daily-three/daily-three';
import { DailyTenPage } from '../daily-ten/daily-ten';
import { EvaluatePage } from '../evaluate/evaluate';
import { WorkWeektablePage } from '../work-weektable/work-weektable';
import { MeInfoPage } from '../me-info/me-info';
import { SignDatePage } from '../sign-date/sign-date';
import { SignTagsPage } from '../sign-tags/sign-tags';
import { BzWorkWeektablePage } from '../bz-work-weektable/bz-work-weektable';
import { BzInfoPage } from '../bz-info/bz-info';
import { LeaderInfoLibPage } from '../leader-info-lib/leader-info-lib';

@Component({
  selector: 'page-workspace',
  templateUrl: 'workspace.html'
})
export class WorkspacePage {

  me: any = {};

  todaySign: any;

  personMenus = [];

  cols: number;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageProvider,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public userProvider: UserProvider,
    public signProvider: SignProvider,
    public menuProvider: MenuProvider
  ) {
    this.personMenus = this.menuProvider.getMenu('workspace-personal').children;
    this.cols = this.personMenus.length>6?3:2;
    this.getMe();
    this.getTodaySign();
  }

  getMe() {
    this.userProvider.getUserInfo({userCode: JSON.parse(this.storage.get('user')).userCode}).subscribe(
      me => {
        this.me = me;
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
    this.signProvider.signInTypeList().subscribe(
      (tags) => {
        let params = {
          onSign: this.getTodaySign.bind(this),
          tags: tags
        };
        if(this.todaySign) {
          params['selectedTag'] = {
            dicItemCode: this.todaySign.signInType,
            dicItemName: this.todaySign.signInTypeName
          };
        }
        let popover = this.popoverCtrl.create(SignTagsPage, params, {
          cssClass: 'backdrop'
        });
        popover.present();
      }
    );
  }

  goMeSign() {
    let popover = this.popoverCtrl.create(SignDatePage, {
      onSign: this.getTodaySign.bind(this)
    }, {
      cssClass: 'large backdrop'
    });
    popover.present();
  }

  goDailyMe() {
    this.navCtrl.push(DailyMePage, {
      user: this.me
    });
  }

  goDailyOnePage(){
    this.navCtrl.push(DailyOnePage,{
      user: this.me
    });
  }

  goDailyThreePage(){
    this.navCtrl.push(DailyThreePage,{
      user: this.me
    });
  }

  goDailyTenPage(){
    this.navCtrl.push(DailyTenPage,{
      user: this.me
    });
  }

  goEvalute(){
    this.navCtrl.push(EvaluatePage);
  }

  goWorkWeektable() {
    this.navCtrl.push(WorkWeektablePage,{
      user: this.me
    });
  }

  goMeInfo() {
    this.navCtrl.push(MeInfoPage, {
      onSign: this.getTodaySign.bind(this)
    });
  }

  goBzWorkWeektable() {
    this.navCtrl.push(BzWorkWeektablePage);
  }

  goBanzi() {
    this.navCtrl.push(BzInfoPage);
  }

  goLeaderInfoLib(){
    this.navCtrl.push(LeaderInfoLibPage);
  }
}
