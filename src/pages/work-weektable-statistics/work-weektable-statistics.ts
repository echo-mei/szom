import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { WorkProvider } from '../../providers/work/work';
import { BetweenDatePickerComponent } from '../../components/between-date-picker/between-date-picker';
import { DateUtilProvider } from '../../providers/date-util/date-util';

@Component({
  selector: 'page-work-weektable-statistics',
  templateUrl: 'work-weektable-statistics.html',
})
export class WorkWeektableStatisticsPage {

  // 用户
  user: any;
  selectTimeShowFlag = false;
  stratDateStr: string = "";
  endDateStr: string = "";
  // 工作周表搜索结果列表
  weektableTypeList: Array<Object>=[];
  timeMax = (new Date()).getFullYear() + 1;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public workProvider: WorkProvider,
    public dateUtil:DateUtilProvider,
    public modalCtrl:ModalController) {
    this.user = this.navParams.get('user');
    this.countWeektable();
  }

  // 选择时间跨度
  goSelectDate() {
    this.modalCtrl.create(BetweenDatePickerComponent, {
      afterSure: (start, end) => {
        this.stratDateStr = this.dateUtil.format(start, 'yyyy-MM-dd');
        this.endDateStr = this.dateUtil.format(end, 'yyyy-MM-dd');
        this.search();
      }
    }).present();
  }

  search() {
    this.selectTimeShowFlag = false;
    this.countWeektable();
  }

  // 重置
  reset() {
    this.stratDateStr = '';
    this.endDateStr = '';
    this.selectTimeShowFlag = true;
  }

  countWeektable() {
    let params = {
      userCode: this.user.userCode,
      startDateStr: this.stratDateStr,
      endDateStr: this.endDateStr
    }
    this.workProvider.countWeektable(params).subscribe(
      (data) => {
        this.weektableTypeList = data;
      }
    )
  }

}
