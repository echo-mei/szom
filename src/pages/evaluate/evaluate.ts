import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EvaluateProvider } from '../../providers/evaluate/evaluate';

@IonicPage()
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
    this.getEvaluate();
  }

  getEvaluate() {
    this.EvaluateProvider.getEvaluateList().subscribe(
      (data) => {
        console.log(data)
        this.zzbmEvaluateLists = data;
        this.sjldEvaluateLists = data;

        this.getZzbmInitDatas();
      }
    );
  }

  goEvaluateCreate(){
    this.navCtrl.push('EvaluteCreatePage');
  }

  getZzbmInitDatas(){
    this.flag = 1;
  }

  getSjldInitDatas(){
    this.flag = 2;
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
