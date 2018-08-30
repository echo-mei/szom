import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ImpressionProvider } from '../../providers/impression/impression';
import { UserImpressionAddPage } from '../user-impression-add/user-impression-add';

@Component({
  selector: 'page-user-impression-create',
  templateUrl: 'user-impression-create.html',
})
export class UserImpressionCreatePage {

  user: any;

  maxTagSize: number = 9;
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
      (data) => {
        this.maxTagSize = data.impTagShowSize || 9;
        this.tagList = data.tagList;
      }
    );
  }

  check(tag) {
    let count = 0;
    this.tagList.forEach((tag) => {
      tag.isChecked == 'Y' && count++;
    });
    if(tag.isChecked == 'N') {
      if(count<this.maxTagSize) {
        tag.isChecked = 'Y';
      }else {
        this.toastCtrl.create({
          cssClass: 'mini',
          message: `最多${this.maxTagSize}个`,
          duration: 1000,
          position: 'middle'
        }).present();
      }
    }else {
      tag.isChecked = 'N';
    }
  }

  goAddImpression() {
    this.navCtrl.push(UserImpressionAddPage, {
      onAdd: (tag) => {
        let count = 0;
        let removeIndex;
        this.tagList.forEach((t, i) => {
          if(tag.impressionTagDefId==t.impressionTagDefId) {
            tag = t;
            removeIndex = i;
          }
          t.isChecked == 'Y' && count++;
        });
        if(removeIndex!=undefined) {
          this.tagList.splice(removeIndex, 1);
        }
        this.tagList.unshift(tag);
        if(count<this.maxTagSize) {
          tag.isChecked = 'Y';
        }
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
