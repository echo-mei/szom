import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, InfiniteScroll, AlertController, LoadingCmp, LoadingController, ToastController } from 'ionic-angular';

import { DailyProvider } from '../../providers/daily/daily';
import { BASE_URL } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-daily-list-radio',
  templateUrl: 'daily-list-radio.html',
})
export class DailyListRadioPage {

  @ViewChild('infinite') infinite: InfiniteScroll;
  @ViewChild('searchbar') searchbar;
  // 当前用户
  user: any;
  // 列表条数
  size = 10;
  // 搜索关键字
  searchKeyword: string = '';
  // 开始时间
  timeStarts: string = "";
  // 结束时间
  timeEnd: string = "";
  // 展示时间选择
  selectTimeShowFlag = false;
  // 日志列表
  logDataList: Array<object>;
  // 选中日志
  selectDaily: object;
  // 是否在点击“导入”按钮时提示信息
  writeThing: any;
  // 点击“导入”按钮后事件
  onDone: (daily) => {};
  // 每周一励|每季三励|每年十励
  witch: any;
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
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    this.user = this.navParams.get('user');
    this.onDone = this.navParams.get('onDone');
    this.writeThing = this.navParams.get('writeThing');
    this.witch = this.navParams.get('witch');
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

  // 搜索
  search() {
    this.selectDaily = undefined;
    this.selectTimeShowFlag = false;
    this.getList().subscribe((list) => {
      this.logDataList = list;
    });
  }

  // 重置时间
  reset(){
    this.timeStarts = '';
    this.timeEnd = '';
    this.selectTimeShowFlag = true;
  }

  // 加载更多
  more(infinite: InfiniteScroll) {
    this.getList({endTime: this.logDataList[this.logDataList.length - 1]['publishTime']}).subscribe((list) => {
      this.logDataList = this.logDataList.concat(list);
      infinite.complete();
    });
  }

  backCreateDaily(){
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

  selectItem(item) {
    this.selectDaily = item;
  }

  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.get('token')}&filePath=${img.filePath}`;
  }
}
