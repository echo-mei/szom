import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimeSelectComponent } from '../../components/time-select/time-select';
import { ImpressionProvider } from '../../providers/impression/impression';

@IonicPage()
@Component({
  selector: 'page-user-impression',
  templateUrl: 'user-impression.html',
})
export class UserImpressionPage {

  user: any;

  tagList: any[] = [];

  @ViewChild('timeSelect') timeSelect: TimeSelectComponent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public impressionProvider: ImpressionProvider
  ) {
    this.user = this.navParams.get('user');
    this.getImpressionList();
  }

  getImpressionList() {
    let params = {tagOwner: this.user.userCode};
    if(this.timeSelect && this.timeSelect.startTime && this.timeSelect.endTime) {
      params['startDate'] = this.timeSelect.startTime;
      params['endDate'] = this.timeSelect.endTime;
    }
    this.impressionProvider.statistics(params).subscribe(
      (list) => {
        this.tagList = list;
      }
    );
  }

  goAddImpression() {
    this.navCtrl.push('UserImpressionCreatePage', {
      user: this.user,
      onCreate: this.getImpressionList.bind(this)
    });
  }

}
