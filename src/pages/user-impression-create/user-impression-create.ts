import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ImpressionProvider } from '../../providers/impression/impression';

@IonicPage()
@Component({
  selector: 'page-user-impression-create',
  templateUrl: 'user-impression-create.html',
})
export class UserImpressionCreatePage {

  user: any;

  tagList: any[] = [];

  onCreate: () => {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public impressionProvider: ImpressionProvider,
    public toastCtrl: ToastController
  ) {
    this.user = this.navParams.get('user');
    this.onCreate = this.navParams.get('onCreate');
    this.getTagList();
  }

  getTagList() {
    this.impressionProvider.allTags({
      tagOwner: this.user.userCode
    }).subscribe(
      (list) => {
        this.tagList = list;
      }
    );
  }

  check(tag) {
    let count = 0;
    this.tagList.forEach((tag) => {
      tag.isChecked == 'Y' && count++;
    });
    if(tag.isChecked == 'N') {
      if(count<9) {
        tag.isChecked = 'Y';
      }else {
        this.toastCtrl.create({
          cssClass: 'mini',
          message: '最多9个',
          duration: 1000,
          position: 'middle'
        }).present();
      }
    }else {
      tag.isChecked = 'N';
    }
  }

  goAddImpression() {
    this.navCtrl.push('UserImpressionAddPage', {
      onAdd: (tag) => {
        this.tagList.unshift(tag);
        this.check(tag);
      }
    });
  }

  getCheckedListIds() {
    return this.tagList.filter((tag) => {
      return tag.isChecked == 'Y';
    }).map((tag) => {
      return tag.impressionTagDefId;
    }).join(',');
  }

  save() {
    this.impressionProvider.update({
      tagOwner: this.user.userCode,
      impressionTagDefIds: this.getCheckedListIds()
    }).subscribe(
      () => {
        this.navCtrl.pop();
        this.onCreate && this.onCreate();
      }
    );
  }

}
