import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, PopoverController, Events, Slides } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { DynamicProvider } from '../../providers/dynamic/dynamic';

@IonicPage()
@Component({
  selector: 'page-dynamic',
  templateUrl: 'dynamic.html',
})

export class DynamicPage {
  @ViewChild('mySlider') slides: Slides;

  type = "attention";
  me: any = {};
  size = 10;
  isActive = 0;
  attentionDynamicList: Array<object> = [];
  unitDynamicList: Array<object> = [];
  recommendDynamicList: Array<object> = [];
  leaderlikeDynamicList: Array<object> = [];

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public events: Events,
    public userProvider: UserProvider,
    public storage: StorageProvider,
    public dynamicProvider: DynamicProvider
  ) {

  }

  ionViewDidLoad() {
    this.getMe();
    // this.goDynamicList(0);
  }

  getMe() {
    this.userProvider.getUserInfo({ userCode: JSON.parse(this.storage.get('user')).userCode }).subscribe(
      me => {
        this.me = me;
      }
    );
  }

  goDynamicSearch() {
    this.navCtrl.push('DynamicSearchPage', {
      type: this.type
    });
  }

  goDynamicList(index) {
    // this.events.unsubscribe("attention-dynamicList:change");
    // this.events.unsubscribe("unit-dynamicList:change");
    // this.events.unsubscribe("recommend-dynamicList:change");
    // this.events.unsubscribe("leaderlike-dynamicList:change");
    this.isActive = index;
    this.setType(index);
    this.slides.slideTo(index, 500);
    this.commentInputHide();
  }

  setType(index) {
    switch (index) {
      case 0:
        this.type = "attention";
        break;
      case 1:
        this.type = "unit";
        break;
      case 2:
        this.type = "recommend";
        break;
      case 3:
        this.type = "leaderlike";
        break;
    }
  }

  onSlideChanged($event) {
    let currentIndex = this.slides.getActiveIndex();
    this.isActive = currentIndex;
    this.setType(currentIndex);
  }

  commentInputHide() {
    // 显示tabs栏
    let tabs = document.getElementsByClassName('tabbar').item(0);
    tabs['style'].display = 'flex';
  }

  popover(event) {
    const popover = this.popoverCtrl.create("PopSelectComponent", {
      buttons: [
        {
          text: '工作日志',
          handler: () => {
            this.navCtrl.push('DailyMePage', {
              user: this.me
            });
            popover.dismiss();
          }
        },
        {
          text: '每周一励',
          handler: () => {
            this.navCtrl.push('DailyOnePage', {
              user: this.me
            });
            popover.dismiss();
          }
        },
        {
          text: '每季三励',
          handler: () => {
            this.navCtrl.push('DailyThreePage', {
              user: this.me
            });
            popover.dismiss();
          }
        },
        {
          text: '每年十励',
          handler: () => {
            this.navCtrl.push('DailyTenPage', {
              user: this.me
            });
            popover.dismiss();
          }
        }
      ]
    }, {
        cssClass: 'mini'
      });
    popover.present({
      ev: event
    });
  }

}
