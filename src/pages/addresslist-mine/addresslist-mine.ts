import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-addresslist-mine',
  templateUrl: 'addresslist-mine.html',
})
export class AddresslistMinePage {

  // 展开组的序号
  expandIndex: number = 0;

  groupList: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dragulaService: DragulaService
  ) {
    this.groupList = [
      {groupId: 1, groupName: '默认分组'},
      {groupId: 2, groupName: '特别关注'}
    ];
  }

  toggle(index) {
    this.expandIndex = this.expandIndex == index ? null : index;
  }

}
