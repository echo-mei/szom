import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { BetweenDatePickerComponent } from '../../components/between-date-picker/between-date-picker';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { BzWeektableProvider } from '../../providers/bz-weektable/bz-weektable';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-bz-work-weektable-statistic',
  templateUrl: 'bz-work-weektable-statistic.html',
})
export class BzWorkWeektableStatisticPage {

  // 用户
  user: any;
  timeStarts: string = "";
  timeEnd: string = "";
  list: any = [];
  isLoading: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public dateUtil: DateUtilProvider,
    public bzWeektableProvider: BzWeektableProvider,
    public userProvider:UserProvider
  ) {
    this.user = this.navParams.get('user');
    this.resetList();
  }

  // 获取数据
  getList(params?) {
    let p = {
      startDateStr: this.timeStarts,
      endDateStr: this.timeEnd,
      unitId: this.user.unitId||this.user.orgId,
      ...params
    };
    this.isLoading = true;
    return this.bzWeektableProvider.staticWeektable(p).do(list => {
      this.isLoading = false;
    });
  }

  // 重置
  resetList() {
    this.getList().subscribe((list) => {
      this.list = list;
    });
  }

  // 选择时间跨度
  goSelectDate() {
    this.modalCtrl.create(BetweenDatePickerComponent, {
      afterSure: (start, end) => {
        this.timeStarts = this.dateUtil.format(start, 'yyyy-MM-dd');
        this.timeEnd = this.dateUtil.format(end, 'yyyy-MM-dd');
        this.resetList();
      }
    }).present();
  }

}
