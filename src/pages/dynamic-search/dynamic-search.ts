import { Component } from '@angular/core';
import { NavController, NavParams, InfiniteScroll, Events, ViewController, ModalController } from 'ionic-angular';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { DynamicProvider } from '../../providers/dynamic/dynamic';
import { BASE_URL } from '../../config';
import { StorageProvider } from '../../providers/storage/storage';
import { DynamicDetailPage } from '../dynamic-detail/dynamic-detail';
import { BetweenDatePickerComponent } from '../../components/between-date-picker/between-date-picker';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-dynamic-search',
  templateUrl: 'dynamic-search.html',
})
export class DynamicSearchPage {

  // 搜索关键字
  selectString: string = '';
  // 开始时间
  timeStarts: string = "";
  // 结束时间
  timeEnd: string = "";
  // getListPromise
  getListPromise: (params) => Observable<any>;
  // 修改记录后置
  onUpdate: (dynamic) => {};

  // 列表数据
  dynamicList: Array<object>;
  // 每页展示条数
  size = 10;
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
    public modalCtrl: ModalController
  ) {
    this.selectString = this.navParams.get("selectString");
    this.timeStarts = this.navParams.get("timeStarts");
    this.timeEnd = this.navParams.get("timeEnd");
    this.getListPromise  = this.navParams.get('getListPromise');
    this.onUpdate  = this.navParams.get('onUpdate');
    this.dynamicList = [];
    this.resetList();
  }

  // ======================= Public Method ===========================

  // 获取数据
  getDynamicList(params?) {
    let p = {
      size: this.size,
      searchKeyword: this.selectString ? this.selectString : '',
      searchStart: this.timeStarts ? this.timeStarts : '',
      searchEnd: this.timeEnd ? this.timeEnd : '',
      ...params
    };
    return this.getListPromise(p).do(
      list => {
        this.hasMore = list.length ? true : false;
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      }
    );
  }

  // 重置列表
  resetList() {
    this.isLoading = true;
    this.getDynamicList().subscribe((list) => {
      this.dynamicList = list;
    });
  }

  // 更新一条数据
  updateOneDynamic(dynamic) {
    this.onUpdate && this.onUpdate(dynamic);
    for (let i = 0; i < this.dynamicList.length; i++) {
      if (this.dynamicList[i]['dynamicId'] === dynamic.dynamicId) {
        this.dynamicList[i] = dynamic;
        return;
      }
    }
  }

  // 获取图像地址
  getImageUrl(img) {
    return `${BASE_URL}/upload?Authorization=${this.storage.token}&filePath=${img.filePath}`;
  }

  // =================== Events ========================

  // 跳转详情页面
  goDynamicShow(dynamic) {
    this.navCtrl.push(DynamicDetailPage, {
      dynamic: dynamic,
      onUpdate: this.updateOneDynamic.bind(this)
    });
  }

  // 选择时间跨度
  goSelectDate() {
    this.modalCtrl.create(BetweenDatePickerComponent, {
      afterSure: (start, end) => {
        this.timeStarts = this.dateUtil.format(start, 'yyyy-MM-dd');
        this.timeEnd = this.dateUtil.format(end, 'yyyy-MM-dd');
        this.search();
      }
    }).present();
  }

  // 返回
  goBack() {
    this.viewCtrl.dismiss({
      selectString: this.selectString,
      timeStarts: this.timeStarts,
      timeEnd: this.timeEnd
    });
  }

  // 搜索
  search() {
    this.resetList();
  }

  // 加载更多
  more(infinite?: InfiniteScroll) {

    this.getDynamicList({endTime: this.dynamicList[this.dynamicList.length - 1]['publishTime']}).subscribe(
      list => {
        list && (this.dynamicList = this.dynamicList.concat(list));
        infinite.complete();
      },
      err => {
        infinite.complete();
      }
    );
  }

}
