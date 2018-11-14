import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
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
    public alertCtrl: AlertController,
    public app: App
  ) {
    this.loginForm = formBuilder.group({
      uname: ['', Validators.compose([Validators.required])],
      reuname: ['', Validators.compose([Validators.required])]
    });
    this.uname = this.loginForm.controls['uname'];
    this.reuname = this.loginForm.controls['reuname'];
  }

  consolesom() {
    if(this.uname.value.length <8 || this.uname.value.length > 16){
      let alert1 = this.alertCtrl.create({
        message: '用户名要求最小8位、最大16位，请检查',
        buttons: [
          {text: '确认', handler: () => {
          }}
        ]
      });
      alert1.present();
      return;
    }else{
      let reg = /^[a-zA-Z][0-9]?/;
      if(this.uname.value && this.uname.value.toLowerCase() != this.reuname.value.toLowerCase()){
        let alert = this.alertCtrl.create({
          message: '两次输入的用户名不一致，请检查',
          buttons: [
            {text: '确认', role: 'cancel'}
          ]
        });
        alert.present();
        return;
      }
      if(!(reg.test(this.uname.value))){
        let alert1 = this.alertCtrl.create({
          message: '用户名首字符必须为英文字符，请检查',
          buttons: [
            {text: '确认', handler: () => {
            }}
          ]
        });
        alert1.present();
        return;
      }
    }
    if(this.uname.value && this.uname.value.toLowerCase() == this.reuname.value.toLowerCase()){
      let params = {
        newAccountNo: this.reuname.value,
        oldAccountNo: JSON.parse(this.storage.get('me')).accountNo
      }
      console.log(params);
      this.userProvider.updateUsername(params).subscribe(
        () => {
          let alert = this.alertCtrl.create({
            message: '修改成功，请重新登录',
            buttons: [
              {text: '确认', handler: () => {
                this.storage.set('lastLoginUserCode', this.reuname.value);
                this.storage.resetStorage();
                this.app.getRootNav().setRoot(LoginPage);
              }}
            ]
          });
          alert.present();
        }
      )
    }
  }
}
