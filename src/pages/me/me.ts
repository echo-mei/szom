import { Component } from '@angular/core';
import { IonicPage, AlertController} from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {

  me: any = {};

  constructor(
    public storage: StorageProvider,
    public alertCtrl: AlertController,
    public userProvider: UserProvider
  ) {
    this.getMe();
  }

  logout() {
    let alert = this.alertCtrl.create({
      message: '确认退出？',
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '确认',
          handler: () => {
            this.storage.remove('token');
            this.storage.remove('user');
          }
        }
      ]
    });
    alert.present();
  }

  getMe() {
    this.userProvider.getUserInfo({userCode: JSON.parse(this.storage.get('user')).userCode}).subscribe(
      me => {
        this.me = me;
      }
    );
  }

}
