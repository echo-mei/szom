import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SignProvider } from '../../providers/sign/sign';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-sign-tags',
  templateUrl: 'sign-tags.html',
})
export class SignTagsPage {

  tags: any[];

  onSign: () => {};

  date;

  selectedTag;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public signProvider: SignProvider,
    public viewCtrl: ViewController,
    public storage: StorageProvider
  ) {
    this.date = new Date();
    this.tags = this.navParams.get('tags');
    this.onSign = this.navParams.get('onSign');
    this.selectedTag = this.navParams.get('selectedTag');
  }

  selectTag(tag) {
    this.selectedTag = tag;
    this.sign();
  }

  sign() {
    if(!this.selectedTag) {
      return;
    }
    let sign = {
      signInType: this.selectedTag.dicItemCode
    };
    this.signProvider.signIn(sign).subscribe(
      () => {
        this.viewCtrl.dismiss();
        this.onSign();
      }
    );
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
