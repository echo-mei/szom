import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TimeSelectComponent } from '../../components/time-select/time-select';
import { ImpressionProvider } from '../../providers/impression/impression';
import { UserImpressionCreatePage } from '../user-impression-create/user-impression-create';

@Component({
  selector: 'page-user-impression',
  templateUrl: 'user-impression.html',
})
export class UserImpressionPage {

  user: any;
  newFlag:any;

  tagList: any[] = [];

  @ViewChild('timeSelect') timeSelect: TimeSelectComponent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public impressionProvider: ImpressionProvider
  ) {
    this.user = this.navParams.get('user');
    this.newFlag = this.navParams.get('newFlag');
    this.getImpressionList();
  }

  getImpressionList() {
    let params = {tagOwner: this.user.userCode};
    if(this.timeSelect) {
      if(this.timeSelect.startTime) {
        params['startDate'] = this.timeSelect.startTime;
      }
      if(this.timeSelect.endTime) {
        params['endDate'] = this.timeSelect.endTime;
      }
    }
    this.impressionProvider.statistics(params).subscribe(
      (list) => {
        this.tagList = list;
      }
    );
  }

  goAddImpression() {
    this.navCtrl.push(UserImpressionCreatePage, {
      user: this.user,
      onCreate: this.getImpressionList.bind(this)
    });
  }

}
