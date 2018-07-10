import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { SignDatePage } from '../sign-date/sign-date';
import { SignTagsPage } from '../sign-tags/sign-tags';
import { UserProvider } from '../../providers/user/user';
import { SignProvider } from '../../providers/sign/sign';

@IonicPage()
@Component({
  selector: 'page-workspace',
  templateUrl: 'workspace.html'
})
export class WorkspacePage {

  me: any = {};

  todaySign: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageProvider,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public userProvider: UserProvider,
    public signProvider: SignProvider
  ) {
    this.getMe();
    this.getTodaySign();
  }

  getMe() {
    this.userProvider.getUserInfo({userCode: JSON.parse(this.storage.get('user')).userCode}).subscribe(
      me => {
        this.me = me;
      }
    );
  }

  getTodaySign() {
    let params = {
      userCode: JSON.parse(this.storage.get('user')).userCode
    }
    this.signProvider.getTodaySign(params).subscribe(
      (data) => {
        this.todaySign = data;
      }
    );
  }

  goSignTags() {
    let popover = this.popoverCtrl.create('SignTagsPage', {
      onSign: this.getTodaySign.bind(this)
    }, {
      cssClass: 'auto'
    });
    popover.present();
  }

  goMeSign() {
    let popover = this.popoverCtrl.create('SignDatePage', {
      onSign: this.getTodaySign.bind(this)
    }, {
      cssClass: 'large'
    });
    popover.present();
  }

  goDailyMe() {
    this.navCtrl.push('DailyMePage', {
      user: this.me
    });
  }

  goDailyOnePage(){
    this.navCtrl.push('DailyOnePage',{
      user: this.me
    });
  }

  goDailyThreePage(){
    this.navCtrl.push('DailyThreePage',{
      user: this.me
    });
  }

  goDailyTenPage(){
    this.navCtrl.push('DailyTenPage',{
      user: this.me
    });
  }

  goEvalute(){
    this.navCtrl.push('EvaluatePage');
  }

  goWorkWeektable() {
    this.navCtrl.push('WorkWeektablePage');
  }

  goMeInfo() {
    this.navCtrl.push('MeInfoPage', {
      onSign: this.getTodaySign.bind(this)
    });
  }

}
