import { Component } from '@angular/core';
import { IonicPage, AlertController} from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {

  constructor(
    public storage: StorageProvider,
    public alertCtrl: AlertController
  ) {
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

  getUserInfo(attr) {
    return this.storage.get('user') ? JSON.parse(this.storage.get('user'))[attr] : null;
  }

}
