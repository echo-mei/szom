import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-me-update-zs',
  templateUrl: 'me-update-zs.html',
})
export class MeUpdateZsPage {

  title: any;
  attr: any;
  user: any;

  value: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public viewCtrl: ViewController
  ) {
    this.title = navParams.get('title');
    this.attr = navParams.get('attr');
    this.user = navParams.get('user');
    this.value = this.user[this.attr];
  }

  save() {
    let selfInfo = {
      ...this.user,
    };
    selfInfo[this.attr] = this.value;
    this.userProvider.saveMySelfInfo(selfInfo).subscribe(
      (data) => {
        this.navCtrl.pop();
        this.user[this.attr] = this.value;
      }
    );
  }

}
