import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ActionSheetController, DateTime } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { DateUtilProvider } from '../../providers/date-util/date-util';
import { ImpressionProvider } from '../../providers/impression/impression';

@IonicPage()
@Component({
  selector: 'page-me-info',
  templateUrl: 'me-info.html',
})
export class MeInfoPage {

  personInfo:any = 'baseInfo';

  selfInfo:any;

  startDate: any;
  endDate: any;
  tags:any[];

  constructor(
    public navCtrl: NavController,
    public storage: StorageProvider,
    public userProvider: UserProvider,
    public actionSheetCtrl: ActionSheetController,
    public dateUtil: DateUtilProvider,
    public impressionProvider: ImpressionProvider
  ) {
    let date = new Date();
    this.startDate = this.dateUtil.format(date, 'yyyy-MM');
    this.endDate = this.dateUtil.format(new Date(date.getFullYear(), date.getMonth()+1, date.getDate()), 'yyyy-MM');
    this.getMySelfInfo();
  }

  changeDate() {
    let params = {
      startDate: this.startDate,
      endDate: this.endDate
    };
    this.impressionProvider.listCount(params).subscribe(
      (data) => {
        this.tags = data;
      }
    );
  }

  getMyInfo(attr) {
    return this.storage.get('user') ? JSON.parse(this.storage.get('user'))[attr] : null;
  }

  getMySelfInfo() {
    this.userProvider.getMySelfInfo().subscribe(
      info => {
        this.selfInfo = info;
      }
    );
  }

  goMeUpdateZS(title, attr){
    this.navCtrl.push('MeUpdateZsPage', {
      title: title,
      attr: attr,
      value: this.selfInfo[attr],
      onSaveSuccess: () => {
        this.getMySelfInfo();
      }
    });
  }

}
