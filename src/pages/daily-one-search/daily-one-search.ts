import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { TimeSelectComponent } from '../../components/time-select/time-select';
import { DailyProvider } from '../../providers/daily/daily';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';

@IonicPage()
@Component({
  selector: 'page-daily-one-search',
  templateUrl: 'daily-one-search.html',
})
export class DailyOneSearchPage {

  @ViewChild('timeSelect') timeSelect: TimeSelectComponent;

  // 搜索关键词
  key:string;
  user: any;

  size:number = 10;
  timeStarts: string = "";
  timeEnd: string = "";

  dailyOneList: any[] = []; // 每周一励列表

  selectTimeShowFlag = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public storage: StorageProvider
  ) {
    this.user = this.navParams.get('user');
    this.initList();
  }

  goBack() {
    this.navCtrl.pop();
  }

  initList() {
    this.dailyOneList = [];
    this.more();
  }

  // 搜索确定按钮实现
  goSelcet(event: any) {
    this.selectTimeShowFlag = false;
    this.initList();
  }

  more(infinite?: InfiniteScroll) {
    let params = {
      size: this.size
    };
    if(this.dailyOneList.length) {
      params['endTime'] = this.dailyOneList[this.dailyOneList.length-1].publishTime;
    }
    if(this.key) {
      params['searchKeyword'] = this.key;
    }
    if(this.timeSelect) {
      let startTime = this.timeSelect.startTime;
      let endTime = this.timeSelect.endTime;
      if(startTime && startTime != "请选择") {
        params['searchStart'] = startTime;
      }else if(endTime && startTime != "请选择") {
        params['searchEnd'] = endTime;
      }
    }
    this.dailyProvider.getDailyOneList(params).subscribe(
      (data) => {
        infinite && infinite.complete();
        if(data.length) {
          infinite && infinite.enable(true);
          this.dailyOneList = this.dailyOneList.concat(data);
        }else {
          infinite && infinite.enable(false);
        }
      }
    );
  }

  goDailyShow(one) {
    this.navCtrl.push('DailyOneShowPage', {
      dailyOne: one,
      onDelete: this.initList.bind(this),
      onUpdate: this.initList.bind(this)
    });
  }

  // 搜索正则高亮匹配
  highLight(str, keyword) {
    //正则替换 
    //g （全文查找出现的所有 pattern） 
    if (keyword) {
      let hlValue = new RegExp(keyword, "g");
      str = str.replace(hlValue, "<font class='hightBright'>" + keyword + "</font>");
    }
    return str;
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

}
