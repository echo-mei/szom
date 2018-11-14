import { Component } from '@angular/core';
import { AlertController, Events, NavController, App, ActionSheetController} from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { UserProvider } from '../../providers/user/user';
import { MenuProvider } from '../../providers/menu/menu';
import { LoginPage } from '../login/login';
import { MeInfoPage } from '../me-info/me-info';
import { WebsocketProvider } from '../../providers/websocket/websocket';
import { MessageInfoPage } from '../message-info/message-info';
import { MeUpdatePage } from '../me-update/me-update';
import { MeHelpFeedbackPage } from '../me-help-feedback/me-help-feedback';

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
    public actionSheetCtrl: ActionSheetController,
    public ws: WebsocketProvider
  ) {
    this.me = this.storage.me;
  }

  logout() {
    this.actionSheetCtrl.create({
      title: '退出智慧干部后，你将不再收到来自智慧干部的消息',
      buttons: [
        {
          text: '确定', handler: () => {
            this.userProvider.logout().subscribe(() => {
              this.app.getRootNav().setRoot(LoginPage);
              setTimeout(() => {
                this.storage.resetStorage();
                this.ws.close();
              }, 500);
            });
          }
        },
        { text: '取消', role: 'cancel',cssClass: 'color: #000',}
      ]
    }).present();
  }

  meSafe() {
    this.navCtrl.push(MeUpdatePage);
  }
  goMeInfo() {
    this.navCtrl.push(MeInfoPage);
  }
  goMessageInfo() {
    this.navCtrl.push(MessageInfoPage);
  }
  goHelpFeedback() {
    this.navCtrl.push(MeHelpFeedbackPage);
  }
}
