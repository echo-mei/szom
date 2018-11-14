import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, PopoverController, Platform, ModalController } from 'ionic-angular';
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
import { SignTagsPage } from '../sign-tags/sign-tags';
import { BzWorkWeektablePage } from '../bz-work-weektable/bz-work-weektable';
import { BzInfoPage } from '../bz-info/bz-info';
import { LeaderInfoLibPage } from '../leader-info-lib/leader-info-lib';
import { BzDailyMePage } from '../bz-daily-me/bz-daily-me';
import { BzInfoLibPage } from '../bz-info-lib/bz-info-lib';
import { HeavyFocusPage } from '../heavy-focus/heavy-focus';
import { BzWeavePage } from '../bz-weave/bz-weave';
import { BzPositionPage } from '../bz-position/bz-position';

@Component({
  selector: 'page-workspace',
  templateUrl: 'workspace.html'
})
export class WorkspacePage {

  // 我
  me: any;
  // 今天的签到信息
  todaySign: any;
  // 个人菜单
  personMenus = [];
  // 个人菜单列数
  personCols = 3;
  // 班子菜单
  teamMenus = [];
  // 班子菜单列数
  teamCols = 3;

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
    public menuProvider: MenuProvider,
    public modalCtrl: ModalController
  ) {
    this.me = this.storage.me;
    if(this.me.userType=='01') {
      this.getTodaySign();
    }
    this.initMenu();
  }

  // =========================== Public Methods ==============================

  // 初始化菜单
  initMenu() {
    if(this.menuProvider.getMenu('workspace-personal')) {
      this.personMenus = this.menuProvider.getMenu('workspace-personal').children;
      this.personCols = this.personMenus.length > 6 ? 3 : 2;
    }
    if(this.menuProvider.getMenu('workspace-team')) {
      this.teamMenus = this.menuProvider.getMenu('workspace-team').children;
      this.teamCols = this.teamMenus.length > 6 ? 3 : 2;
    }
  }

  // 获取今天的签到信息
  getTodaySign() {
    let params = {
      userCode: this.me.userCode
    }
    this.signProvider.getTodaySign(params).subscribe(
      (data) => {
        this.todaySign = data;
      }
    );
  }

  //========================= Events ================================

  // 跳转到签到列表
  goSignTags(ev) {
    ev.stopPropagation();
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
        this.modalCtrl.create(SignTagsPage, params).present();
      }
    );
  }

  // 跳转到日志列表
  goDailyMe() {
    this.navCtrl.push(DailyMePage, {
      user: this.me
    });
  }

  // 跳转到每周一励列表
  goDailyOnePage(){
    this.navCtrl.push(DailyOnePage, {
      user: this.me
    });
  }

  // 跳转到每季三励列表
  goDailyThreePage(){
    this.navCtrl.push(DailyThreePage, {
      user: this.me
    });
  }

  // 跳转到每年十励列表
  goDailyTenPage(){
    this.navCtrl.push(DailyTenPage, {
      user: this.me
    });
  }

  // 跳转到工作周表
  goWorkWeektable() {
    this.navCtrl.push(WorkWeektablePage, {
      user: this.me
    });
  }

  // 跳转到个人信息
  goMeInfo() {
    this.navCtrl.push(MeInfoPage);
  }

  // 跳转到干部信息库
  goLeaderInfoLib() {
    this.navCtrl.push(LeaderInfoLibPage);
  }

  // 跳转到班子工作周表
  goBzWorkWeektable() {
    this.navCtrl.push(BzWorkWeektablePage,{
      user:this.me
    });
  }

  // 跳转到班子信息
  goBanzi() {
    this.navCtrl.push(BzInfoPage);
  }

  // 跳转到班子工作日志
  goBzDailyMe() {
    this.navCtrl.push(BzDailyMePage,{
      user: this.me
    });
  }

  // 跳到班子信息库
  goBzInfoLib(){
    this.navCtrl.push(BzInfoLibPage);
  }

  goHeavyFocus(){
    this.navCtrl.push(HeavyFocusPage);
  }


  goWeave() {
    this.navCtrl.push(BzWeavePage, {
      user: this.me
    });
  }

  goPosition() {
    this.navCtrl.push(BzPositionPage,{
      user:this.me
    });
  }
}
