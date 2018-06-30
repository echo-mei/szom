import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController } from 'ionic-angular';
import {
  trigger,  state,  style, animate, transition
} from '@angular/animations';
@IonicPage()
@Component({
  selector: 'page-search-conditions',
  templateUrl: 'search-conditions.html',
  animations: [
    trigger('heroState', [
        state('inactive', style({
            top: '38px' 
        })),
        state('active', style({
            top: '-110px'
        })),
        transition('inactive => active', animate('100ms ease-in')),
        transition('active => inactive', animate('100ms ease-out'))
    ])
]
})
export class SearchConditionsPage {

  timeStarts:string = "null";
  timeEnd:string = "null";

  isTimeStart:boolean = true;
  isTimeEnd:boolean = true;
  //搜索栏状态
  animate:string ='active';
  //图标
  selectBtn:string = 'md-xia';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchConditionsPage');
  }

  goBack(){
    this.navCtrl.pop();
  }
  TimeStartChange(){
    this.isTimeStart = false;
  }
  TimeEndChange(){
    this.isTimeEnd = false;
  }
  reset(){
    this.isTimeStart = true;
    this.isTimeEnd = true;
    this.timeStarts = '';
    this.timeEnd = '';
  }
  selectShow(event){
    if( this.animate == 'inactive'){
      this.animate = 'active';
      this.selectBtn = 'md-xia';
    }else{
      this.animate = 'inactive';
      this.selectBtn = 'md-shang';
    }

  }
  goSelcet(){
    this.animate = 'active';
    this.selectBtn = 'md-xia';
  }

}
