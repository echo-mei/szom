import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { SignDatePage } from '../sign-date/sign-date';
import { SignTagsPage } from '../sign-tags/sign-tags';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-workspace',
  templateUrl: 'workspace.html'
})
export class WorkspacePage {

  me: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageProvider,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public userProvider: UserProvider
  ) {
    this.getMe();
  }

  getMe() {
    this.userProvider.getMe().subscribe(
      me => {
        this.me = me;
      }
    );
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
