import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, InfiniteScroll, AlertController, ToastController, ModalController } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';
import { BASE_URL } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';
import { BetweenDatePickerComponent } from '../../components/between-date-picker/between-date-picker';
import { DateUtilProvider } from '../../providers/date-util/date-util';

@Component({
  selector: 'page-daily-list-radio',
  templateUrl: 'daily-list-radio.html',
})
export class DailyListRadioPage {

  // 当前用户
  user: any;
  // 点击“导入”按钮后事件
  onDone: (daily) => {};
  // 是否在点击“导入”按钮时提示信息
  writeThing: any;
  // 每周一励|每季三励|每年十励
  witch: any;
  // 最小时间
  minDate: any;
  // 最大时间
  maxDate: any;

  // 列表条数
  size = 10;
  // 搜索关键字
  searchKeyword: string = '';
  // 开始时间
  timeStarts: string = "";
  // 结束时间
  timeEnd: string = "";
  // 日志列表
  logDataList: Array<object>;
  // 选中日志
  selectDaily: object;
  // 是否还有更多数据
  hasMore: boolean = true;
  // 是否正在加载
  isLoading: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dailyProvider: DailyProvider,
    public alertCtrl: AlertController,
    public storage: StorageProvider,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public dateUtil: DateUtilProvider
  ) {
    this.user = this.navParams.get('user');
    this.onDone = this.navParams.get('onDone');
    this.writeThing = this.navParams.get('writeThing');
    this.witch = this.navParams.get('witch');
    this.minDate = this.navParams.get('minDate');
    this.maxDate = this.navParams.get('maxDate');
    this.minDate && (this.timeStarts = this.dateUtil.format(this.minDate, 'yyyy-MM-dd'));
    this.maxDate && (this.timeEnd = this.dateUtil.format(this.maxDate, 'yyyy-MM-dd'));
    this.resetList();
  }

  // ======================= Public Method ===========================

  // 重置列表
  resetList() {
    this.getList().subscribe((list) => {
      this.logDataList = list;
    });
  }

  // 获取数据
  getList(params?) {
    let p = {
      size: this.size,
      searchKeyword: this.searchKeyword,
      userCode: this.user.userCode,
      searchStart: this.timeStarts,
      searchEnd: this.timeEnd,
      ...params
    };
    this.isLoading = true;
    return this.dailyProvider.getLogDailyList(p).do(list => {
      this.hasMore = list.length ? true : false;
      this.isLoading = false;
    });
  }

  // 获取图片地址
  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`;
  }

  // ======================= Events ===========================

  // 点击筛选
  onClickFilter() {
    this.modalCtrl.create(BetweenDatePickerComponent, {
      minDate: this.minDate,
      maxDate: this.maxDate,
      afterSure: (start, end) => {
        this.timeStarts = this.dateUtil.format(start, 'yyyy-MM-dd');
        this.timeEnd = this.dateUtil.format(end, 'yyyy-MM-dd');
        this.resetList();
      }
    }).present();
  }

  // 点击一条记录
  onClickItem(item) {
    this.selectDaily = item;
  }

  // 搜索
  onClickSearch() {
    this.selectDaily = undefined;
    this.getList().subscribe((list) => {
      this.logDataList = list;
    });
  }

  // 滚动加载
  onScrollList(infinite: InfiniteScroll) {
    this.getList({endTime: this.logDataList[this.logDataList.length - 1]['publishTime']}).subscribe((list) => {
      this.logDataList = this.logDataList.concat(list);
      infinite.complete();
    });
  }

  // 点击导入
  onClickImport(){
    if(this.writeThing){
      let alert = this.alertCtrl.create({
        message: `引用工作日志后，将清空之前已填写的${this.witch}所有内容，确认吗？`,
        buttons: [
          {
            text: '取消',
            role: 'cancel'
          },
          {
            text: '确认',
            handler: () => {
              alert.dismiss();
              this.navCtrl.pop();
              if(this.selectDaily){
                this.onDone && this.onDone(this.selectDaily);
              }
            }
          }
        ]
      });
      alert.present();
    }else{
      this.navCtrl.pop();
      if(this.selectDaily){
        this.onDone && this.onDone(this.selectDaily);
      }
    }

  }
}
