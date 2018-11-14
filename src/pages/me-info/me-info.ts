import { Component, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, PopoverController, NavParams, Slides, ModalController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { ImpressionProvider } from '../../providers/impression/impression';
import { SignProvider } from '../../providers/sign/sign';
import { MeUpdateZsPage } from '../me-update-zs/me-update-zs';
import { SignDatePage } from '../sign-date/sign-date';
import { BetweenDatePickerComponent } from '../../components/between-date-picker/between-date-picker';
import { ImpresionDetailPage } from '../impresion-detail/impresion-detail';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-me-info',
  templateUrl: 'me-info.html',
})
export class MeInfoPage {
  @ViewChild('mySlider') slides: Slides;

  todaySign: any;
  personInfo = 'baseInfo';
  me: any = {};
  selfInfo = {};
  tagList: any[] = [];
  isActive = 0;

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
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public statusBar: StatusBar
  ) {
    this.getMe();
  }

  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  ionViewWillLeave() {
    this.statusBar.styleDefault();
  }

  // 获取我的所有信息
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

  // 获取今天的签到信息
  getTodaySign() {
    let params = {
      userCode: this.storage.me.userCode
    }
    this.signProvider.getTodaySign(params).do(
      (data) => {
        this.todaySign = data;
      }
    );
  }

  // 获取个人自述
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

  // 选择时间跨度
  goSelectDate() {
    this.modalCtrl.create(BetweenDatePickerComponent, {
      afterSure: (start, end) => {
        this.startTime = this.dateUtil.format(start, 'yyyy-MM-dd');
        this.endTime = this.dateUtil.format(end, 'yyyy-MM-dd');
        this.getImpressionList();
      }
    }).present();
  }

  goInfoList(index) {
    this.isActive = index;
    this.slides.slideTo(index, 500);
  }

  onSlideChanged($event) {
    let currentIndex = this.slides.getActiveIndex();
    this.isActive = currentIndex;
  }

  // 跳转到签到历史界面
  goMeSign() {
    this.modalCtrl.create(SignDatePage, {
      user:this.storage.me
    }).present();
  }

  // 跳转到修改自述信息
  goMeUpdateZS(title, attr, maxLength) {
    this.navCtrl.push(MeUpdateZsPage, {
      title: title,
      attr: attr,
      user: this.me,
      selfInfo: this.selfInfo,
      onUpdate: this.getSelfInfo.bind(this),
      maxLength: maxLength
    });
  }

  goDetail() {
    this.navCtrl.push(ImpresionDetailPage, {
      tagList: this.tagList
    });
  }
}
