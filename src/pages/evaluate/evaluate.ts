import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EvaluateProvider } from '../../providers/evaluate/evaluate';
import { EvaluteCreatePage } from '../evalute-create/evalute-create';
import { SearchConditionsPage } from '../search-conditions/search-conditions';

@Component({
  selector: 'page-leaderevaluate',
  templateUrl: 'evaluate.html',
})
export class EvaluatePage {
  pet:any = "zzbm";
  zzbmEvaluateLists:any;
  sjldEvaluateLists:any;
  flag = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public EvaluateProvider: EvaluateProvider) {
  }

  ionViewDidLoad() {

  }
  //干部评价新增跳转
  goEvaluateCreate(){
    this.navCtrl.push(EvaluteCreatePage);
  }
  //干部评价搜索调整
  goEvaluatSearch(){
    this.navCtrl.push(SearchConditionsPage);
  }

  getZzbmInitDatas(){
    this.flag = 1;
  }

  getSjldInitDatas(){
    this.flag = 2;
  }

}
