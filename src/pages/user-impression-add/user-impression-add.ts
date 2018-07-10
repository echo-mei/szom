import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImpressionProvider } from '../../providers/impression/impression';

@IonicPage()
@Component({
  selector: 'page-user-impression-add',
  templateUrl: 'user-impression-add.html',
})
export class UserImpressionAddPage {

  tagName: string;

  onAdd: (tag) => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public impressionProvider: ImpressionProvider
  ) {
    this.onAdd = this.navParams.get('onAdd');
  }

  addImpression() {
    this.impressionProvider.add({
      tagName: this.tagName
    }).subscribe(
      (tag) => {
        this.navCtrl.pop();
        this.onAdd && this.onAdd(tag);
      }
    );
  }

}
