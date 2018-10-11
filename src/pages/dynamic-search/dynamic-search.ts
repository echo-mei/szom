import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, InfiniteScroll, Events, ViewController, LoadingController, ModalController } from 'ionic-angular';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { DynamicProvider } from '../../providers/dynamic/dynamic';
import { BASE_URL } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';
import { DynamicDetailPage } from '../dynamic-detail/dynamic-detail';
import { BetweenDatePickerComponent } from '../../components/between-date-picker/between-date-picker';

@Component({
  selector: 'page-dynamic-search',
  templateUrl: 'dynamic-search.html',
})
export class DynamicSearchPage {
  // 列表数据
  dynamicList: Array<object>;
  // 每页展示条数
  size = 10;
  // 类型
  type: string = '';
  // 搜索关键字
  selectString: string = '';
  // 开始时间
  timeStarts: string = "";
  // 结束时间
  timeEnd: string = "";
  //
  dynamicSearchListSus: string = '';
  // 是否正在加载
  isLoading: boolean = true;
  // 是否有更多数据
  hasMore: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dateUtil: DateUtilProvider,
    public dynamicProvider: DynamicProvider,
    public events: Events,
    public storage: StorageProvider,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
    this.type = this.navParams.get("type");
    this.selectString = this.navParams.get("selectString");
    this.timeStarts = this.navParams.get("timeStarts");
    this.timeEnd = this.navParams.get("timeEnd");
    this.dynamicList = [];
    this.resetList();
  }

  ionViewDidLoad() {
    this.dynamicSearchListSus = this.type + "-dynamicSearchList:change";
    this.events.subscribe(this.dynamicSearchListSus, (dynamic) => {
      this.updateOneDynamic(dynamic);
    })
  }

  goBack() {
    this.events.unsubscribe(this.dynamicSearchListSus);
    this.viewCtrl.dismiss({
      selectString: this.selectString,
      timeStarts: this.timeStarts,
      timeEnd: this.timeEnd
    });
  }

  witchProvider(params, type) {
    switch (type) {
      case "attention":
        return this.dynamicProvider.getAttentionDynamicList(params);
      case "unit":
        return this.dynamicProvider.getUnityDnamicList(params);
      case "recommend":
        return this.dynamicProvider.getRecommendDynamicList(params);
      case "leaderlike":
        return this.dynamicProvider.getLeaderLikeDynamicList(params);
    }
  }

  // 获取数据
  getDynamicList(params?) {
    let p = {
      size: this.size,
      searchKeyword: this.selectString,
      searchStart: this.timeStarts,
      searchEnd: this.timeEnd,
      ...params
    };
    this.isLoading = true;
    return this.witchProvider(p, this.type).do(list => {
      this.hasMore = list.length ? true : false;
      this.isLoading = false;
    });
  }

  // 重置列表
  resetList() {
    this.getDynamicList().subscribe((list) => {
      this.dynamicList = list;
    });
  }

  // 跳转详情页面
  goDynamicShow(dynamic) {
    this.navCtrl.push(DynamicDetailPage, {
      type: this.type,
      dynamic: dynamic
    });
  }

  // 选择时间跨度
  goSelectDate() {
    // this.selectTimeShowFlag = !this.selectTimeShowFlag;
    this.modalCtrl.create(BetweenDatePickerComponent, {
      afterSure: (start, end) => {
        this.timeStarts = this.dateUtil.format(start, 'yyyy-MM-dd');
        this.timeEnd = this.dateUtil.format(end, 'yyyy-MM-dd');
        this.search();
      }
    }).present();
  }

  // 搜索
  search() {
    this.resetList();
  }

  // 加载更多
  more(infinite?: InfiniteScroll) {
    this.getDynamicList({endTime: this.dynamicList[this.dynamicList.length - 1]['publishTime']}).subscribe((list) => {
      list && (this.dynamicList = this.dynamicList.concat(list));
      infinite.complete();
    });
  }

  // 更新一条数据
  updateOneDynamic(dynamic) {
    for (let i = 0; i < this.dynamicList.length; i++) {
      if (this.dynamicList[i]['dynamicId'] === dynamic.dynamicId) {
        this.dynamicList[i] = dynamic;
        return;
      }
    }
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

}
