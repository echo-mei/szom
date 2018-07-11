import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Events } from 'ionic-angular';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { DynamicProvider } from '../../providers/dynamic/dynamic';
import { BASE_URL } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';


@IonicPage()
@Component({
  selector: 'page-dynamic-search',
  templateUrl: 'dynamic-search.html',
})
export class DynamicSearchPage {
  @ViewChild('infinite') infinite: InfiniteScroll;

  dynamicList: any;
  size = 10;
  timeStarts: string = "";
  timeEnd: string = "";
  selectTimeShowFlag = false;
  selectString: string = '';
  type: string = '';
  dynamicSearchListSus: string = '';
  dynamic: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dateUtil: DateUtilProvider,
    public dynamicProvider: DynamicProvider,
    public events: Events,
    public storage: StorageProvider
  ) {
    this.type = this.navParams.get("type");
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
    this.navCtrl.pop();
  }

  // 搜索正则高亮匹配
  highLight(str,keyword) {
    //正则替换 
    //g （全文查找出现的所有 pattern） 
    if(keyword){
      let hlValue = new RegExp(keyword,"g");
      str = str.replace(hlValue, "<font class='hightBright'>$&</font>");
    }
    return str;
  }

  // 重置
  reset() {
    this.timeStarts = '';
    this.timeEnd = '';
    this.selectTimeShowFlag = true;
  }

  // 跳转详情页面
  goDynamicShow(dynamic) {
    this.navCtrl.push('DynamicDetailPage', {
      type: this.type,
      dynamic: dynamic
    });
  }

  initDynamicList() {
    this.dynamicList = [];
    this.more();
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
        return this.dynamicProvider.getRecommendDynamicList();
      case "leaderlike":
        return this.dynamicProvider.getLeaderLikeDynamicList(params);
    }
  }

  more(infinite?: InfiniteScroll) {
    this.infinite && this.infinite.enable(true);
    let params = {
      size: this.size,
      searchKeyword: this.selectString,
      searchStart: this.timeStarts,
      searchEnd: this.dateUtil.format(new Date(this.timeEnd), 'yyyy-MM-dd')
    };
    if (this.dynamicList.length) {
      params['endTime'] = this.dynamicList[this.dynamicList.length - 1]['publishTime'];
    }
    this.getDynamicList(params, this.type).subscribe(
      (data) => {
        infinite && infinite.complete();
        if (data.length) {
          infinite && infinite.enable(true);
          this.dynamicList = this.dynamicList.concat(data);
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
