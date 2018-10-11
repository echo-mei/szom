import { Component } from '@angular/core';
import { AlertController, Events, NavController, App, ActionSheetController} from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { MenuProvider } from '../../providers/menu/menu';
import { LoginPage } from '../login/login';
import { MeSafePage } from '../me-safe/me-safe';

@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {

  me: any = {};

  constructor(
    public storage: StorageProvider,
    public alertCtrl: AlertController,
    public userProvider: UserProvider,
    public events: Events,
    public navCtrl: NavController,
    public menuProvider: MenuProvider,
    public app: App,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.getMe();
  }

  logout() {
    this.actionSheetCtrl.create({
      title: '退出智慧干部后，你将不再收到来自智慧干部的消息',
      buttons: [
        {
          text: '确定', handler: () => {
            this.app.getRootNav().setRoot(LoginPage);
            this.storage.remove('user', 'menuList', 'token');
            this.events.publish('logout');
          }
        },
        { text: '取消', role: 'cancel' }
      ]
    }).present();
  }

  getMe() {
    this.userProvider.getUserInfo({userCode: JSON.parse(this.storage.get('user')).userCode}).subscribe(
      me => {
        this.me = me;
      }
    );
  }
  meSafe() {
    this.navCtrl.push(MeSafePage);
  }
}
