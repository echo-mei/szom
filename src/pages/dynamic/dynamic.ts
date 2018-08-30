import { Component, ViewChild, ViewChildren } from '@angular/core';
import { NavController, PopoverController, Events, Slides, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { DynamicProvider } from '../../providers/dynamic/dynamic';
import { DynamicListPage } from '../dynamic-list/dynamic-list';
import { MenuProvider } from '../../providers/menu/menu';
import { DynamicSearchPage } from '../dynamic-search/dynamic-search';
import { DailyMePage } from '../daily-me/daily-me';
import { PopSelectComponent } from '../../components/pop-select/pop-select';

@Component({
  selector: 'page-dynamic',
  templateUrl: 'dynamic.html',
})

export class DynamicPage {
  @ViewChild('mySlider') slides: Slides;
  @ViewChildren(DynamicListPage) children;

  type = "attention";
  me: any = {};
  size = 10;
  isActive = 0;
  attentionDynamicList: Array<object> = [];
  unitDynamicList: Array<object> = [];
  recommendDynamicList: Array<object> = [];
  leaderlikeDynamicList: Array<object> = [];
  // 搜索相关
  selectString: string = '';
  timeStarts: any = '';
  timeEnd: any = '';
  //初始加载数据
  initLoadFlag = [true,true,true,true];

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public events: Events,
    public userProvider: UserProvider,
    public storage: StorageProvider,
    public dynamicProvider: DynamicProvider,
    public menuProvider: MenuProvider,
    public modalCtrl: ModalController
  ) {

  }

  ionViewDidLoad() {
    this.getMe();
  }

  ionViewDidEnter(){
    this.events.subscribe("dynamicListInit", () => {
      this.initData();
    });
  }

  ionViewDidLeave(){
    this.events.unsubscribe("dynamicListInit");
  }

  initData(){
    this.initLoadFlag = [true,true,true,true];
    this.goDynamicList(0);
    this.onSlideChanged();
  }

  getDynamicListData(index){
    if(this.initLoadFlag[index]){
      //初始化,没数据才请求
      this.children._results[index].initDynamicList();
      this.initLoadFlag[index] = false;
    }
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

  onSlideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    this.isActive = currentIndex;
    this.setType(currentIndex);
    this.getDynamicListData(currentIndex);
  }

  //模拟双击事件
  dbClick: number = 0;
  goTop() {
    this.dbClick++;
    let that = this;
    setTimeout(function () {
      that.dbClick = 0;
    }, 1000);
    if (this.dbClick > 1) {
      this.dbClick = 0;
      this.children._results[this.isActive].goTop();
    }
  }

  commentInputHide() {
    this.children._results[this.isActive].commentInputHide();
  }

  getMe() {
    this.userProvider.getUserInfo({ userCode: JSON.parse(this.storage.get('user')).userCode }).subscribe(
      me => {
        this.me = me;
      }
    );
  }

  goDynamicSearch() {

    let searchModal = this.modalCtrl.create(DynamicSearchPage, {
      type: this.type,
      selectString: this.selectString,
      timeStarts: this.timeStarts,
      timeEnd: this.timeEnd
    });

    searchModal.onDidDismiss(data => {
      if (data) {
        this.selectString = data.selectString;
        this.timeStarts = data.timeStarts;
        this.timeEnd = data.timeEnd;
      }
    });
    searchModal.present();
  }


  popover(event) {
    const popover = this.popoverCtrl.create(PopSelectComponent, {
      buttons: [
        {
          icon: 'md-gongzuorizhi',
          text: '工作日志',
          handler: () => {
            this.navCtrl.push(DailyMePage, {
              user: this.me
            });
            popover.dismiss();
          }
        },
        // {
        //   text: '每周一励',
        //   handler: () => {
        //     this.navCtrl.push(DailyOnePage, {
        //       user: this.me
        //     });
        //     popover.dismiss();
        //   }
        // },
        // {
        //   text: '每季三励',
        //   handler: () => {
        //     this.navCtrl.push(DailyThreePage, {
        //       user: this.me
        //     });
        //     popover.dismiss();
        //   }
        // },
        // {
        //   text: '每年十励',
        //   handler: () => {
        //     this.navCtrl.push(DailyTenPage, {
        //       user: this.me
        //     });
        //     popover.dismiss();
        //   }
        // }
      ]
    }, {
        cssClass: 'mini'
      });
    popover.present({
      ev: event
    });
  }

}
