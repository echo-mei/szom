import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WorkWeektablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-work-weektable',
  templateUrl: 'work-weektable.html',
})
export class WorkWeektablePage {

  workList=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkWeektablePage');
    this.workList = [
      {week:'星期一',day:'6月4日',work:[
        {time:'上午',what:'东门街道调研工作',do:'基层调研'},
        {time:'下午',what:'办公室研究工作',do:'机关公办'},
        {time:'晚上',what:'研究安居房建设工作，会见李教授',do:'政务接待'},
      ]
      },
      {week:'星期二',day:'6月5日',work:[
        {time:'上午',what:'东门街道调研工作',do:'基层调研'},
        {time:'下午',what:'办公室研究工作',do:'机关公办'},
        {time:'晚上',what:'研究安居房建设工作，会见李教授',do:'政务接待'},
      ]
      },
      {week:'星期三',day:'6月5日',work:[
        {time:'上午',what:'东门街道调研工作',do:'基层调研'},
        {time:'下午',what:'办公室研究工作',do:'机关公办'},
        {time:'晚上',what:'研究安居房建设工作，会见李教授',do:'政务接待'},
      ]
      }
    ];
  }

}
