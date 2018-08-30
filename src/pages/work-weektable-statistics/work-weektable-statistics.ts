import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WorkProvider } from '../../providers/work/work';

@Component({
  selector: 'page-work-weektable-statistics',
  templateUrl: 'work-weektable-statistics.html',
})
export class WorkWeektableStatisticsPage {

  selectTimeShowFlag = false;
  stratDateStr: string = "";
  endDateStr: string = "";
  weektableTypeList: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public workProvider: WorkProvider) {
    this.countWeektable();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkWeektableStatisticsPage');
  }

  goSelcet() {
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
      stratDateStr: this.stratDateStr,
      endDateStr: this.endDateStr
    }
    this.workProvider.countWeektable(params).subscribe(
      (data) => {
        this.weektableTypeList = data;
      }
    )
  }

}
