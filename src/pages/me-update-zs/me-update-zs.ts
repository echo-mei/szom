import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-me-update-zs',
  templateUrl: 'me-update-zs.html',
})
export class MeUpdateZsPage {

  title:any;
  attr:any;
  value:any;
  onSaveSuccess:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public viewCtrl: ViewController
  ) {
    this.title = navParams.get('title');
    this.attr = navParams.get('attr');
    this.value = navParams.get('value');
    this.onSaveSuccess = navParams.get('onSaveSuccess');
  }

  save() {
    let selfInfo = {};
    selfInfo[this.attr] = this.value;
    this.userProvider.saveMySelfInfo(selfInfo).subscribe(
      (data) => {
        this.onSaveSuccess();
        this.navCtrl.pop();
      }
    );
  }

}
