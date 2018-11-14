import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';


@Component({
  selector: 'page-bz-weave-look',
  templateUrl: 'bz-weave-look.html',
})
export class BzWeaveLookPage {

  // 用户
  user: any;
  // 编制列表
  bzWeaveList:Array<Object>=[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public bzInfoProvider: BzInfoProvider) {
    this.user = this.navParams.get('user');
    this.getWeaveList();
  }
  getWeaveList() {
    let params = {
      unitId: this.user.unitId
    }
    this.bzInfoProvider.getBzWeave(params).subscribe(
      list => {
        this.bzWeaveList = list;
      }
    )
  }

}
