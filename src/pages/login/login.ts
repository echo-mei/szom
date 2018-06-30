import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, Events, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  showPassword: false;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public formBuilder: FormBuilder,
    public userProvider: UserProvider,
    public storage: StorageProvider,
    public events: Events
  ) {
    this.platform.ready().then(
      () => {
        this.statusBar.overlaysWebView(true);
        this.statusBar.backgroundColorByHexString('#ffffff');
      }
    );
    this.loginForm = formBuilder.group({
      userCode: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  login() {
    if ( this.loginForm.controls['userCode'].hasError('required')
    || this.loginForm.controls['password'].hasError('required') ) {
      return;
    }
    this.userProvider.login(this.loginForm.value.userCode, this.loginForm.value.password).subscribe(
      (data) => {
        this.storage.set('token', data.tokenId);
        this.events.publish('user:login');
      }
    );
  }

}
