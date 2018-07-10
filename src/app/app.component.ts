import { Component } from '@angular/core';
import { Events, Platform, App, NavController, ToastController } from 'ionic-angular';
import { StorageProvider } from '../providers/storage/storage';
import { UserProvider } from '../providers/user/user';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  canExit = false;

  loginPage = 'LoginPage';
  tabsPage = 'TabsPage';

  constructor(
    public splashScreen: SplashScreen,
    public app: App,
    public platform: Platform,
    public storage: StorageProvider,
    public userProvider: UserProvider,
    public events: Events,
    public toastCtrl: ToastController
  ) {
    this.platform.ready().then(
      () => {
        this.splashScreen.hide();
      }
    );
    this.platform.registerBackButtonAction(() => {
      let activeNav: NavController = this.app.getActiveNavs()[0];
      if(activeNav.canGoBack()) {
        activeNav.pop();
      }else {
        if(this.canExit) {
          this.platform.exitApp();
        }else {
          this.toastCtrl.create({
            cssClass: 'mini',
            message: '再按一次退出应用',
            position: 'bottom',
            duration: 2000
          }).present();
          this.canExit = true;
          setTimeout(() => {
            this.canExit = false;
          }, 2000);
        }
      }
    });
  }

  hasLogin() {
    return this.storage.get('token') ? true : false;
  }
}

