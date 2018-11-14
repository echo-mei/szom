import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BzInfoLibProvider } from '../../providers/bz-info-lib/bz-info-lib';
import { BzInfoLibShowPage } from '../bz-info-lib-show/bz-info-lib-show';


@Component({
  selector: 'page-bz-info-lib',
  templateUrl: 'bz-info-lib.html',
})
export class BzInfoLibPage {

  // 班子列表
  bzInfoLibList:Array<Object> = [];
  // 搜索字符串
  selectString:String = "";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public bzInfoLibProvider:BzInfoLibProvider) {
  }

  ionViewDidLoad() {
    this.getBzInfoLibList();
  }

  // ============================ Public Methods ==================================
  //获取权限内的班子列表
  getBzInfoLibList(params?){
    this.bzInfoLibProvider.getBzInfoLibList(params).subscribe((list)=>{
      this.bzInfoLibList = list;
    });
  }

  // ============================ Events ==========================================
  // 输入搜索
  ionInputSearch(){
    let params={
      keywords:this.selectString
    }
    this.getBzInfoLibList(params);
  }

  // 点击班子管理人员进入班子信息页
  onClickBzPerson(user){
    this.navCtrl.push(BzInfoLibShowPage,{
      user:user,
      empFollowOrCancel:true
    })
  }
}
