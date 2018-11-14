import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Events, Platform, NavController, Content, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { MenuProvider } from '../../providers/menu/menu';
import { TabsPage } from '../tabs/tabs';
import { JSEncrypt } from 'jsencrypt';
import { WebsocketProvider } from '../../providers/websocket/websocket';
import { Device } from '@ionic-native/device';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  @ViewChild('content') content: Content;

  second: number;
  loginForm: FormGroup;
  showPassword: false;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public formBuilder: FormBuilder,
    public userProvider: UserProvider,
    public storage: StorageProvider,
    public events: Events,
    public navCtrl: NavController,
    public menuProvider: MenuProvider,
    public websocketProvider: WebsocketProvider,
    private device: Device,
    public keyboard: Keyboard,
    public loadingCtrl: LoadingController
  ) {
    this.loginForm = formBuilder.group({
      userCode: [this.storage.lastLoginUserCode, Validators.compose([Validators.required])],
      password: [''],
      msgCode: ['']
    });
    this.keyboard.onKeyboardShow().subscribe(() => {
      this.content.scrollTo(0, document.getElementById('userCode').offsetTop, 20);
    });
    this.keyboard.onKeyboardHide().subscribe(() => {
      this.content.scrollTo(0, 0, 20);
    });
  }

  isPhone() {
    let flag = this.loginForm.controls['userCode'].value
      && /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.loginForm.controls['userCode'].value);
    if (flag) {
      this.loginForm.controls['password'].clearValidators();
      this.loginForm.controls['password'].updateValueAndValidity();
      this.loginForm.controls['msgCode'].setValidators([Validators.required]);
    } else {
      this.loginForm.controls['msgCode'].clearValidators();
      this.loginForm.controls['msgCode'].updateValueAndValidity();
      this.loginForm.controls['password'].setValidators([Validators.required]);
    }
    return flag;
  }

  getSMSCode() {
    this.userProvider.getSMSCode({ mobilePhone: this.loginForm.value.userCode }).subscribe(
      () => {
        this.second = 120;
        let interval = setInterval(() => {
          this.second = this.second - 1;
          if (this.second == 0) {
            clearInterval(interval);
          }
        }, 1000);
      }
    );
  }

  // 生成唯一的uuid
  getUUID() {
    return 'xxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  login() {
    let loading = this.loadingCtrl.create();
    loading.present();
    let params = {
      accountNo: this.loginForm.value.userCode,
      channel: /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent) ? 'MOBILE' : 'PC',
      deviceId: this.device.uuid?this.device.uuid.replace(/-/g,""):this.getUUID(),
      
    };
    let fn = 'login';
    if (this.isPhone()) {
      params['msgCode'] = this.loginForm.value.msgCode;
      
      fn = 'sendSMSCode';
    } else {
      params['password'] = this.loginForm.value.password;
    }
    this.userProvider.getRSAPublicKey().subscribe(
      (signKey) => {
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(signKey);
        params['password'] = encrypt.encrypt(this.loginForm.value.password);
        this.userProvider[fn](params).subscribe(
          (data) => {
            this.storage.token = data.authorization;
            this.storage.me = data;
            this.storage.lastLoginUserCode = params.accountNo;
            this.menuProvider.listMenuTree().subscribe(
              (menus) => {
                this.menuProvider.storeMenu(menus);
                this.navCtrl.setRoot(TabsPage);
                this.websocketProvider.connectWebsocket();
                loading.dismiss();
              },
              err => {
                loading.dismiss();
              }
            );
          },
          err => {
            loading.dismiss();
          }
        );
      },
      err => {
        loading.dismiss();
      }
    );
  }

  forbidden() {
    return false;
  }

}
