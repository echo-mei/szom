import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, App, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Events, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-me-update-phone',
  templateUrl: 'me-update-phone.html',
})
export class MeUpdatePhonePage {

  second:number;
  form: FormGroup;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public statusBar: StatusBar,
    public formBuilder: FormBuilder,
    public userProvider: UserProvider,
    public storage: StorageProvider,
    public events: Events,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public app: App
  ) {
    this.form = formBuilder.group({
      phoneNum: ['', Validators.compose([Validators.required, Validators.minLength(11)])],
      msgCode: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  getSMSCode() {
    this.userProvider.getNewMobliePhoneSMSCode({mobilePhone: this.form.controls['phoneNum'].value}).subscribe(
      () => {
        let toast = this.toastCtrl.create({
          cssClass: 'mini',
          message: '验证码发送成功',
          position: 'bottom',
          duration: 2000
        });
        toast.present();
        this.second = 120;
        let interval = setInterval(() => {
          this.second = this.second - 1;
          if(this.second==0) {
            clearInterval(interval);
          }
        }, 1000);
      }
    );
  }

  sureSubmit() {
    let params = {
      oldMobilePhone: this.navParams.get('oldMobilePhone'),
      newMobilePhone: this.form.value.phoneNum,
      smsCode: this.form.value.msgCode,
    };
    let loading = this.loadingCtrl.create({
      content: '校验中...'
    });
    let message;
    this.form.controls['phoneNum'].value == this.navParams.get('oldMobilePhone') ? message='修改成功，请重新登录' : message = '修改成功，请返回登录界面使用新的手机号码重新登录，确定后返回登录界面';
    this.userProvider.updatePhone(params).subscribe(
      (msg) => {
        let alertc = this.alertCtrl.create({
          message: message,
          buttons: [
            {text: '确认', handler: () => {
              this.storage.resetStorage();
              this.app.getRootNav().setRoot(LoginPage);
            }}
          ]
        });
        alertc.present();
      },
      (err) => {
      }
    );
  }

}
