import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, InfiniteScroll, LoadingController } from 'ionic-angular';
import { DailyProvider } from '../../providers/daily/daily';
import { StorageProvider } from '../../providers/storage/storage';
import { BASE_URL } from '../../config';
import { DailyOneShowPage } from '../daily-one-show/daily-one-show';
import { DateUtilProvider } from '../../providers/date-util/date-util';

@Component({
  selector: 'page-daily-one-search',
  templateUrl: 'daily-one-search.html',
})
export class DailyOneSearchPage {
  @ViewChild('infinite') infinite: InfiniteScroll;
  @ViewChild('searchbar') searchbar;
  // @ViewChild('timeSelect') timeSelect: TimeSelectComponent;
  // 搜索关键词
  selectString: string = "";
  user: any;

  size: number = 10;
  timeStarts: string = "";
  timeEnd: string = "";

  dailyOneList: any[] = []; // 每周一励列表

  selectTimeShowFlag = false;
  showNotFound: boolean = false;
  onceLoad:number = 1;
  dateControls: object = [
    {
      options: []
    },
    {
      options: []
    }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public storage: StorageProvider,
    public dateUtil: DateUtilProvider,
    public loadingCtrl: LoadingController
  ) {
    this.user = this.navParams.get('user');
    this.initList();
    this.getTime();
  }

  //获取日期控件值
  getTime() {
    let startYear = 1900;
    let date, year;
    date = new Date;
    year = date.getFullYear();
    let that = this;
    setTimeout(function () {
      for (let i = 0; i <= year - startYear; i++) {
        that.dateControls[0].options[i] = { text: `${year - i}年`, value: `${year - i}年` }
      };
      that.dateControls[0].options.forEach((element) => {
        year = that.dateUtil.getWeeksOfYear(parseInt(element.value)).length;
        for (let i = 1; i <= year; i++) {
          that.dateControls[1].options.push({ text: `第${i}周`, value: `第${i}周`, parentVal: `${element.value}` });
        }
      });
    }, 100);

  }

  goBack() {
    this.navCtrl.pop();
    // this.searchbar.setFocus();
  }

  initList() {
    this.more(false);
  }

  // 搜索确定按钮实现
  goSelcet(event: any) {
    this.selectTimeShowFlag = false;
    this.initList();
  }

  // 重置
  reset() {
    this.timeStarts = '';
    this.timeEnd = '';
    this.selectTimeShowFlag = true;
  }

  getOneWeekOut(params) {
    let startYear = parseInt(params['searchStart']);
    let endYear = parseInt(params['searchEnd']);
    let startWeek = parseInt(params['searchStart'].replace(/[0-9]+/, '').match(/[0-9]+/))-1;
    let endWeek = parseInt(params['searchEnd'].replace(/[0-9]+/, '').match(/[0-9]+/))-1;
    let startDate = new Date(this.dateUtil.getOneWeek(startYear, startWeek).firstDate);
    let endDate = new Date(this.dateUtil.getOneWeek(endYear, endWeek).lastDate);
    params['searchStart'] = startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate();
    params['searchEnd'] = endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+endDate.getDate();
  }

  more(boolSearch = true,infinite?: InfiniteScroll) {
    let loading = this.loadingCtrl.create({
      content: '处理中...'
    });
    this.infinite && this.infinite.enable(true);
    let params = {
      size: this.size,
      userCode: this.user.userCode,
      searchKeyword: this.selectString,
      searchStart: this.timeStarts,
      searchEnd: this.timeEnd
    };
    if(params['searchStart'] || params['searchEnd']){
      this.getOneWeekOut(params);
    }
    if (boolSearch && this.dailyOneList.length) {
      params['endTime'] = this.dailyOneList[this.dailyOneList.length - 1]['publishTime'];
    }
    this.onceLoad-->0?loading.present():'';
    this.dailyProvider.getDailyOneList(params).subscribe(
      (data) => {
        if(!boolSearch && !(this.dailyOneList == data.list && !data.list)){
          loading.present();
        };
        if(!data.list){
          this.showNotFound = true;
        };
        loading.dismiss();
        infinite && infinite.complete();
        if(!params['endTime'] && data.list == ''){
          this.dailyOneList = [];
        }
        if (data.list.length) {
          infinite && infinite.enable(true);
          boolSearch?this.dailyOneList = this.dailyOneList.concat(data.list):this.dailyOneList = data.list;
        } else {
          infinite && infinite.enable(false);
        }
      }
    );
  }

  goDailyShow(one) {
    this.navCtrl.push(DailyOneShowPage, {
      dailyOne: one,
      onDelete: this.initList.bind(this),
      onUpdate: this.initList.bind(this)
    });
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }

}
