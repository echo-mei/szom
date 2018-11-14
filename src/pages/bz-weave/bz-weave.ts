import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { BzWeaveAddPage } from '../bz-weave-add/bz-weave-add';
import { BzInfoProvider } from '../../providers/bz-info/bz-info';

@Component({
  selector: 'page-bz-weave',
  templateUrl: 'bz-weave.html',
})
export class BzWeavePage {

  // 用户
  user: any;
  // 编制列表
  bzWeaveList:Array<Object>=[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public bzInfoProvider: BzInfoProvider,
    public popoverCtrl: PopoverController
  ) {
    this.user = this.navParams.get('user');
    this.getWeaveList();
  }

  getWeaveList() {
    let params = {
      unitId: this.user.orgId
    }
    this.bzInfoProvider.getBzWeave(params).subscribe(
      list => {
        this.bzWeaveList = list;
      }
    )
  }

  onClickWeave(weave) {
    this.navCtrl.push(BzWeaveAddPage, {
      weave:weave,
      showMore: true,
      item: weave,
      title: '班子编制',
      onUpdate: this.getWeaveList.bind(this)
    });
  }

  onClikeCreate() {
    this.navCtrl.push(BzWeaveAddPage, {
      canCreate: true,
      showMore: false,
      user: this.user,
      title: '新增班子编制',
      onUpdate: this.getWeaveList.bind(this)
    });
  }
}
