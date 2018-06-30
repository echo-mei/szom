import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SignProvider } from '../../providers/sign/sign';

@IonicPage()
@Component({
  selector: 'page-sign-tags',
  templateUrl: 'sign-tags.html',
})
export class SignTagsPage {

  tags: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public signProvider: SignProvider,
    public viewCtrl: ViewController
  ) {
    this.getTags();
  }

  getTags() {
    let date = new Date();
    this.signProvider.signInCount(date.getFullYear(), date.getMonth()+1).subscribe(
      (tags) => {
        this.tags = tags;
      }
    );
  }

  sign(signInType) {
    let sign = {
      signInType: signInType
    };
    this.signProvider.signIn(sign).subscribe(
      () => {
        this.viewCtrl.dismiss();
      }
    );
  }

}
