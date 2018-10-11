import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Events, Platform, App, NavController, ToastController, IonicApp } from 'ionic-angular';
import { StorageProvider } from '../providers/storage/storage';
import { UserProvider } from '../providers/user/user';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuProvider } from '../providers/menu/menu';
import { StatusBar } from '@ionic-native/status-bar';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Keyboard } from '@ionic-native/keyboard';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { WebsocketProvider } from '../providers/websocket/websocket';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('mask') mask: ElementRef;

  canExit = false;

  rootPage;

  keyboardIsShow: boolean;

  constructor(
    public splashScreen: SplashScreen,
    public app: App,
    public platform: Platform,
    public storage: StorageProvider,
    public userProvider: UserProvider,
    public events: Events,
    public toastCtrl: ToastController,
    public menuProvider: MenuProvider,
    public statusBar: StatusBar,
    public eleRef: ElementRef,
    public renderer2: Renderer2,
    public ionicApp: IonicApp,
    public keyboard: Keyboard,
    public mobileAccessibility: MobileAccessibility,
    public screenOrientation: ScreenOrientation,
    public websocketProvider: WebsocketProvider
  ) {
    if(this.storage.get('token')) {
      this.rootPage = TabsPage;
      this.websocketProvider.connectWebsocket();
    }else {
      this.rootPage = LoginPage;
    }
    this.platform.ready().then(
      () => {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
        this.mobileAccessibility.usePreferredTextZoom(false);
        this.statusBar.overlaysWebView(true);
        this.statusBar.styleDefault();
        this.platform.registerBackButtonAction(() => {
          let activeNav: NavController = this.app.getActiveNavs()[0];
          let activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._overlayPortal.getActive();
          let loadingPortal = this.ionicApp._loadingPortal.getActive();
          if(this.keyboardIsShow){

          }else if(activePortal) {
            activePortal.dismiss();
          }else if(loadingPortal) {

          }else if(this.ionicApp._getActivePortal()) {
            this.ionicApp._getActivePortal().dismissPageChangeViews();
          }else if(activeNav.canGoBack()) {
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
    );

    // 阻止多次点击
    this.app.viewWillEnter.subscribe(() => {
      this.mask.nativeElement.style.display = 'block';
    });
    this.app.viewDidEnter.subscribe(() => {
      this.mask.nativeElement.style.display = 'none';
    });
    // 弹出输入框
    this.keyboard.onKeyboardShow().subscribe(() => {
      this.keyboardIsShow = true;
    });
    this.keyboard.onKeyboardHide().subscribe(() => {
      this.keyboardIsShow = false;
    });
  }
}

