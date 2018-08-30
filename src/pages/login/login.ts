import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Events, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { MenuProvider } from '../../providers/menu/menu';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  second:number;
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
    public menuProvider: MenuProvider
  ) {
    this.loginForm = formBuilder.group({
      userCode: ['', Validators.compose([Validators.required])],
      password: [''],
      msgCode: ['']
    });
  }

  isPhone() {
    let flag = this.loginForm.controls['userCode'].value
      &&/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.loginForm.controls['userCode'].value);
    if(flag) {
      this.loginForm.controls['password'].clearValidators();
      this.loginForm.controls['password'].updateValueAndValidity();
      this.loginForm.controls['msgCode'].setValidators([Validators.required]);
    }else {
      this.loginForm.controls['msgCode'].clearValidators();
      this.loginForm.controls['msgCode'].updateValueAndValidity();
      this.loginForm.controls['password'].setValidators([Validators.required]);
    }
    return flag;
  }

  getSMSCode() {
    this.userProvider.getSMSCode({mobilePhone: this.loginForm.value.userCode}).subscribe(
      () => {
        this.second = 60;
        let interval = setInterval(() => {
          this.second = this.second - 1;
          if(this.second==0) {
            clearInterval(interval);
          }
        }, 1000);
      }
    );
  }

  login() {
    let params = {
      accountNo: this.loginForm.value.userCode,
      channel: /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent) ? 'MOBILE' : 'PC'
    };
    let fn = 'login';
    if(this.isPhone()) {
      params['msgCode'] = this.loginForm.value.msgCode;
      fn = 'sendSMSCode';
    }else {
      params['password'] = this.loginForm.value.password;
    }
    this.userProvider[fn](params).subscribe(
      (data) => {
        this.storage.set('token', data.authorization);
        this.storage.set('user', JSON.stringify(data));
        this.menuProvider.listMenuTree().subscribe(
          (menus) => {
            this.menuProvider.storeMenu(menus);
            this.navCtrl.setRoot(TabsPage);
          }
        );
      }
    );
  }

}
