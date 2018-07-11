import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SignProvider } from '../../providers/sign/sign';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-sign-tags',
  templateUrl: 'sign-tags.html',
})
export class SignTagsPage {

  tags: any[];

  onSign: () => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public signProvider: SignProvider,
    public viewCtrl: ViewController,
    public storage: StorageProvider
  ) {
    this.onSign = this.navParams.get('onSign');
    this.getTags();
  }

  getTags() {
    this.signProvider.signInTypeList().subscribe(
      (tags) => {
        this.tags = tags;
      }
    );
  }

  sign(tag) {
    let sign = {
      signInType: tag.dicItemCode
    };
    this.signProvider.signIn(sign).subscribe(
      () => {
        this.viewCtrl.dismiss();
        this.onSign();
      }
    );
  }

}
