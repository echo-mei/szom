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
    let reg = /^(?!([a-zA-Z]+|[a-z\d]+|[a-z~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+|[A-Z\d]+|[A-Z~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+|[\d~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+)$)[a-zA-Z\d~`@#\$%\^&\*\(\)_\-\+=\{\[\}\]\|\\:;\"\'<,>\.\?\/\!]+$/
    this.loginForm = formBuilder.group({
      pwd: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(16), Validators.required, Validators.pattern(reg)])],
      repwd: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(16), Validators.required, Validators.pattern(reg)])]
    });
    this.pwd = this.loginForm.controls['pwd'];
    this.repwd = this.loginForm.controls['repwd'];
  }
  consolesom() {
    let params = {
      accountNo: JSON.parse(this.storage.get('user')).accountNo,
      password1: this.pwd.value,
      password2: this.repwd.value,
      operatorPersonCode: JSON.parse(this.storage.get('user')).userCode
    }
    console.log(params)
    if(this.pwd.value && this.pwd.value == this.repwd.value){
      this.userProvider.updatePassword(params).subscribe(
        () => {
          let alert = this.alertCtrl.create({
            message: '修改成功，请重新登录',
            buttons: [
              {text: '确认', handler: () => {
                this.storage.clear();
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
