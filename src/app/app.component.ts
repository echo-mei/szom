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
import { WEBSOCKET_URL } from '../config';


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
      this.connectWebsocket();
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

  connectWebsocket() {
    this.websocketProvider.connect(WEBSOCKET_URL, () => {
      // 新的关注
      this.websocketProvider.subscribe(
        `/attention/notifications/${JSON.parse(this.storage.get('user')).userCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            this.events.publish('ws-addresslist');
          }
        }
      );
      // 干部动态-关注
      this.websocketProvider.subscribe(
        `/attentionDynamicMessage/notifications/${JSON.parse(this.storage.get('user')).userCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            console.log('有新的干部动态-关注');
            this.events.publish('ws-dynamic-attention');
          }
        }
      );
      // 干部动态-本单位
      this.websocketProvider.subscribe(
        `/unitDynamicMessage/notifications/${JSON.parse(this.storage.get('user')).userCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            console.log('有新的干部动态-本单位');
            this.events.publish('ws-dynamic-unit');
          }
        }
      );
      // 干部动态-领导批赞-单位领导
      this.websocketProvider.subscribe(
        `/leaderLikeDynamicMessage/notifications/unitId/${JSON.parse(this.storage.get('user')).orgCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            console.log('有新的干部动态-领导批赞-单位领导');
            this.events.publish('ws-dynamic-leader-unit');
          }
        }
      );
      // 干部动态-领导批赞-市领导
      this.websocketProvider.subscribe(
        `/leaderLikeDynamicMessage/notifications/all`,
        (frame) => {
          if(frame.body == 'Y') {
            console.log('有新的干部动态-领导批赞-市领导');
            this.events.publish('ws-dynamic-leader-all');
          }
        }
      );
      // 干部动态
      this.websocketProvider.subscribe(
        `/dynamicMessage/notifications/userCode/${JSON.parse(this.storage.get('user')).userCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            console.log('有新的干部动态-用户');
            this.events.publish('ws-dynamic');
          }
        }
      );
      // 干部动态
      this.websocketProvider.subscribe(
        `/dynamicMessage/notifications/unitId/${JSON.parse(this.storage.get('user')).orgCode}`,
        (frame) => {
          if(frame.body == 'Y') {
            console.log('有新的干部动态-单位');
            this.events.publish('ws-dynamic');
          }
        }
      );
      // 干部动态
      this.websocketProvider.subscribe(
        `/dynamicMessage/notifications/all`,
        (frame) => {
          if(frame.body == 'Y') {
            console.log('有新的干部动态-所有');
            this.events.publish('ws-dynamic');
          }
        }
      );
    }, () => {
      setTimeout(() => {
        this.connectWebsocket();
      }, 1000);
    });
  }
}

