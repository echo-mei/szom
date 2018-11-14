import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';


@Component({
  selector: 'page-bz-position-look',
  templateUrl: 'bz-position-look.html',
})
export class BzPositionLookPage {

  // 用户
  user: any;
  // 职数列表
  bzPositionList:Array<Object>=[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public bzInfoProvider: BzInfoProvider) {
      this.user = this.navParams.get('user');
      this.getPositionList();
  }


  getPositionList() {
    let params = {
      unitId: this.user.unitId
    }
    this.bzInfoProvider.getBzPositionList(params).subscribe(
      list => {
        this.bzPositionList=list;
      }
    )
  }
}
