import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-me-update-user',
  templateUrl: 'me-update-user.html',
})
export class MeUpdateUserPage {

  loginForm: FormGroup;
  uname : any;
  reuname: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userProvider: UserProvider,
    public storage: StorageProvider,
    public app: App
  ) {
    let reg = /^(?!([a-zA-Z]+|[a-z\d]+|[a-z~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+|[A-Z\d]+|[A-Z~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+|[\d~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+)$)[a-zA-Z\d~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+$/
    this.loginForm = formBuilder.group({
      uname: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(16), Validators.required, Validators.pattern(reg)])],
      reuname: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(16), Validators.required, Validators.pattern(reg)])]
    });
    this.uname = this.loginForm.controls['uname'];
    this.reuname = this.loginForm.controls['reuname'];
  }

}
