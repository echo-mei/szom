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
  weekDay=['周一','周二','周三','周四','周五','周六','周日'];
  btnColor=['blue','green','yellow','purple'];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkWeektablePage');
    this.workList = [
      {week:'星期一',workDate:'2018-6-4',dayPeriod:'上午',content:'习近平强调，管党治党不仅关系党的前途命运，还关系到什么我就不知道了',do:'基层调研'},
      {week:'星期一',workDate:'2018-6-4',dayPeriod:'上午',content:'办公室研究工作',do:'机关办公'},
      {week:'星期一',workDate:'2018-6-4',dayPeriod:'晚上',content:'研究安居房建设工作，会见李教授',do:'政务接待'},
      {week:'星期二',workDate:'2018-6-5',dayPeriod:'全天',content:'陪同住建部领导谈话调研，前往广州参加XX会议',do:'参加会议'},
      {week:'星期五',workDate:'2018-6-8',dayPeriod:'全天',content:'机关办公',do:'机关办公'}
    ];
  }

  itemSelected(){

  }
  goCreate(){
    this.navCtrl.push('WorkWeektableCreatePage');
  }

}
