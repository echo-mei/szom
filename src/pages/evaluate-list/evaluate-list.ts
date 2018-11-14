import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EvaluateProvider } from '../../providers/evaluate/evaluate';

@Component({
  selector: 'page-evaluate-list',
  templateUrl: 'evaluate-list.html',
})
export class EvaluateListPage {
  @Input()  msg:string;
  @Input() type: any;
  pet:any = "zzbm";
  flag = 0;
  zzbmEvaluateLists:any;
  sjldEvaluateLists:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public EvaluateProvider: EvaluateProvider) {
    this.getEvaluate();//请求数据
  }

  ionViewDidLoad() {

  }

  getZzbmInitDatas(){
    this.flag = 1;
  }

  getSjldInitDatas(){
    this.flag = 2;
  }
  //请求数据
  getEvaluate() {
    this.EvaluateProvider.getEvaluateList().subscribe(
      (data) => {
        this.zzbmEvaluateLists = data;
        this.sjldEvaluateLists = data;

        this.getZzbmInitDatas();
      }
    );
  }



  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        if(this.flag === 1){
          this.zzbmEvaluateLists.push( this.zzbmEvaluateLists[i] );
        }else{
          this.sjldEvaluateLists.push( this.sjldEvaluateLists[i] );
        }
      }
      if(this.flag === 1){
        console.log(this.flag,this.zzbmEvaluateLists)
      }else{
        console.log(this.flag,this.sjldEvaluateLists)
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        if(this.flag === 1){
          this.zzbmEvaluateLists.push( this.zzbmEvaluateLists[i] );
        }else{
          this.sjldEvaluateLists.push( this.sjldEvaluateLists[i] );
        }
      }
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
