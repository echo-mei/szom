import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { SignDatePage } from '../sign-date/sign-date';
import { SignTagsPage } from '../sign-tags/sign-tags';

@IonicPage()
@Component({
  selector: 'page-workspace',
  templateUrl: 'workspace.html'
})
export class WorkspacePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageProvider,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController
  ) {
  }

  getUserInfo(attr) {
    return this.storage.get('user') ? JSON.parse(this.storage.get('user'))[attr] : null;
  }

  goSignTags() {
    let popover = this.popoverCtrl.create(SignTagsPage, {}, {
      cssClass: 'small short'
    });
    popover.present();
  }

  goMeSign() {
    let popover = this.popoverCtrl.create(SignDatePage, {}, {
      cssClass: 'large'
    });
    popover.present();
  }

  goDailyMe() {
    this.navCtrl.push('DailyMePage');
  }

  goDailyOnePage(){
    this.navCtrl.push('DailyOnePage');
  }

  goDailyThreePage(){
    this.navCtrl.push('DailyThreePage');
  }

  goDailyTenPage(){
    this.navCtrl.push('DailyTenPage');
  }

  goEvalute(){
    this.navCtrl.push('EvaluatePage');
  }

  goWorkWeektable() {
    this.navCtrl.push('WorkWeektablePage');
  }

  goMeInfo() {
    this.navCtrl.push('MeInfoPage');
  }

}
