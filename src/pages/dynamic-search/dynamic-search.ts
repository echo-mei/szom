import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, InfiniteScroll, Events, ViewController, LoadingController } from 'ionic-angular';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { DynamicProvider } from '../../providers/dynamic/dynamic';
import { BASE_URL } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';
import { DynamicDetailPage } from '../dynamic-detail/dynamic-detail';

@Component({
  selector: 'page-dynamic-search',
  templateUrl: 'dynamic-search.html',
})
export class DynamicSearchPage {
  @ViewChild('infinite') infinite: InfiniteScroll;
  @ViewChild('searchbar') searchbar;
  dynamicList: Array<object>;
  size = 10;
  type: string = '';
  selectString: string = '';
  timeStarts: string = "";
  timeEnd: string = "";
  selectTimeShowFlag = false;
  dynamicSearchListSus: string = '';
  dynamic: any;
  onceLoad: number = 1;
  showNotFound: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dateUtil: DateUtilProvider,
    public dynamicProvider: DynamicProvider,
    public events: Events,
    public storage: StorageProvider,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController
  ) {
    this.type = this.navParams.get("type");
    this.selectString = this.navParams.get("selectString");
    this.timeStarts = this.navParams.get("timeStarts");
    this.timeEnd = this.navParams.get("timeEnd");
    this.dynamicList = [];
    this.initDynamicList();
  }

  ionViewDidLoad() {
    this.dynamicSearchListSus = this.type + "-dynamicSearchList:change";
    this.events.subscribe(this.dynamicSearchListSus, (dynamic) => {
      console.log(this.dynamicSearchListSus+"订阅成功");
      this.getDynamic(dynamic);
    })
  }

  goBack() {
    this.events.unsubscribe(this.dynamicSearchListSus);
    this.viewCtrl.dismiss({
      selectString:this.selectString,
      timeStarts:this.timeStarts,
      timeEnd:this.timeEnd
    });
  }

  // 重置
  reset() {
    this.timeStarts = '';
    this.timeEnd = '';
    this.selectTimeShowFlag = true;
  }

  // 跳转详情页面
  goDynamicShow(dynamic) {
    this.navCtrl.push(DynamicDetailPage, {
      type: this.type,
      dynamic: dynamic
    });
  }

  initDynamicList() {
    // this.dynamicList = [];
    this.more(false);
  }

  // 搜索确定按钮实现
  goSelcet(event) {
    this.selectTimeShowFlag = false;
    this.initDynamicList();
  }

  getDynamicList(params, type) {
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

  more(boolSearch=true, infinite?: InfiniteScroll) {
    let loading = this.loadingCtrl.create({
      content: '处理中...'
    });
    this.onceLoad-->0?loading.present():'';
    this.infinite && this.infinite.enable(true);
    let params = {
      size: this.size,
      searchKeyword: this.selectString,
      searchStart: this.timeStarts,
      // searchEnd: this.dateUtil.format(new Date(this.timeEnd), 'yyyy-MM-dd')
      searchEnd: this.timeEnd
    };
    if (boolSearch && this.dynamicList.length) {
      params['endTime'] = this.dynamicList[this.dynamicList.length - 1]['publishTime'];
    }
    this.getDynamicList(params, this.type).subscribe(
      (data) => {
        if(!boolSearch && !(this.dynamicList.length == data.length && data.length == 0)){
          loading.present();
        };
        if(!data[0]){
          this.showNotFound = true;
        };
        loading.dismiss();
        
        infinite && infinite.complete();
        if(!params['endTime'] && data==''){
          this.dynamicList = [];
        }
        if (data.length) {
          infinite && infinite.enable(true);
          boolSearch? this.dynamicList = this.dynamicList.concat(data): this.dynamicList = data;
        } else {
          infinite && infinite.enable(false);
        }
      }
    );
  }

  getDynamic(dynamic) {
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
