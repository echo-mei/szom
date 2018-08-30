import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-me-update-zs',
  templateUrl: 'me-update-zs.html',
})
export class MeUpdateZsPage {

  title: any;
  attr: any;
  user: any;
  selfInfo: any;
  value: any;

  maxLength: number = 196;

  onUpdate: () => {}

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public viewCtrl: ViewController
  ) {
    this.title = navParams.get('title');
    this.attr = navParams.get('attr');
    this.user = navParams.get('user');
    this.selfInfo = navParams.get('selfInfo');
    this.onUpdate = navParams.get('onUpdate');
    this.maxLength = navParams.get('maxLength');
    this.value = this.selfInfo[this.attr];
  }

  focus(ele) {
    ele.setFocus();
  }

  save() {
    let selfInfo = {
      ...this.selfInfo,
      personId: this.user.personId
    };
    selfInfo[this.attr] = this.value;
    this.userProvider.saveMySelfInfo(selfInfo).subscribe(
      () => {
        this.navCtrl.pop();
        this.onUpdate();
      }
    );
  }

}
