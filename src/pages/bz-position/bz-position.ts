import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BzPositionAddPage } from '../bz-position-add/bz-position-add'
import { BzInfoProvider } from '../../providers/bz-info/bz-info';

@Component({
  selector: 'page-bz-position',
  templateUrl: 'bz-position.html',
})
export class BzPositionPage {

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
      unitId: this.user.orgId
    }
    this.bzInfoProvider.getBzPositionList(params).subscribe(
      list => {
        this.bzPositionList=list;
      }
    )
  }

  onClikeCreate(){
    this.navCtrl.push(BzPositionAddPage, {
      canCreate: true,
      showMore: false,
      user: this.user,
      onUpdate: this.getPositionList.bind(this),
      title: '新增班子职数'
    })
  }

  onClickPosition(position){
    this.navCtrl.push(BzPositionAddPage, {
      position:position,
      showMore: true,
      user: this.user,
      onUpdate: this.getPositionList.bind(this),
      title: '班子职数'
    })
  }
}
