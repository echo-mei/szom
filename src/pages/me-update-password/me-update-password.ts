import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-me-update-password',
  templateUrl: 'me-update-password.html',
})
export class MeUpdatePasswordPage {

  loginForm: FormGroup;
  pwd : any;
  repwd: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userProvider: UserProvider,
    public storage: StorageProvider,
    public app: App,
    public alertCtrl: AlertController
  ) {
    this.loginForm = formBuilder.group({
      // pwd: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(16), Validators.required, Validators.pattern(reg)])],
      pwd: ['', Validators.compose([Validators.required])],
      repwd: ['', Validators.compose([Validators.required])]
    });
    this.pwd = this.loginForm.controls['pwd'];
    this.repwd = this.loginForm.controls['repwd'];
  }
  consolesom() {
    if(this.pwd.value.length <8 || this.pwd.value.length > 16){
      let alert1 = this.alertCtrl.create({
        message: '密码要求最小8位、最大16位，请检查',
        buttons: [
          {text: '确认', handler: () => {
          }}
        ]
      });
      alert1.present();
      return;
    }else{
      let reg = /^(?!([a-zA-Z]+|[a-z\d]+|[a-z~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+|[A-Z\d]+|[A-Z~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+|[\d~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+)$)[a-zA-Z\d~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+$/
      if(this.pwd.value && this.pwd.value.toLowerCase() != this.repwd.value.toLowerCase()){
        let alert = this.alertCtrl.create({
          message: '两次输入的密码不一致，请检查',
          buttons: [
            {text: '确认', role: 'cancel'}
          ]
        });
        alert.present();
        return;
      }
      if(!(reg.test(this.pwd.value))){
        let alert1 = this.alertCtrl.create({
          message: '密码必须包含大写字母、小写字母、数字、符号至少三种组合，请检查',
          buttons: [
            {text: '确认', handler: () => {
            }}
          ]
        });
        alert1.present();
        return;
      }
    }
    let params = {
      accountNo: this.storage.me.accountNo,
      password1: this.pwd.value,
      password2: this.repwd.value,
      operatorPersonCode: this.storage.me.userCode
    }
    console.log(params)
    if(this.pwd.value && this.pwd.value == this.repwd.value){
      this.userProvider.updatePassword(params).subscribe(
        () => {
          let alert = this.alertCtrl.create({
            message: '修改成功，请重新登录',
            buttons: [
              {text: '确认', handler: () => {
                this.storage.resetStorage();
                this.app.getRootNav().setRoot(LoginPage);
              }}
            ]
          });
          alert.present();
        }
      )
    }else{
      let alert = this.alertCtrl.create({
        message: '两次输入的密码不一致，请检查',
        buttons: [
          {text: '确认', role: 'cancel'}
        ]
      });
      alert.present();
    }

  }


}
