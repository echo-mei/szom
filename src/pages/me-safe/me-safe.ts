import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Events, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { MeUpdatePage } from '../me-update/me-update';
import { MeUpdatePhonePage } from '../me-update-phone/me-update-phone';

@Component({
  selector: 'page-me-safe',
  templateUrl: 'me-safe.html',
})
export class MeSafePage {

  second:number;
  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform,
    public statusBar: StatusBar,
    public formBuilder: FormBuilder,
    public userProvider: UserProvider,
    public storage: StorageProvider,
    public events: Events,
    public toastCtrl: ToastController
  ) {
    this.form = formBuilder.group({
      phoneNum: ['', Validators.compose([Validators.required])],
      msgCode: ['', Validators.compose([Validators.required])],
    });
    this.getMe();
  }

  getMe() {
    this.userProvider.getMe().subscribe(
      me => {
        this.form.controls['phoneNum'].setValue(me.mobilePhone1);
      }
    );
  }

  getSMSCode() {
    this.userProvider.getMobliePhoneSMSCode({mobilePhone: this.form.controls['phoneNum'].value}).subscribe(
      () => {
        let toast = this.toastCtrl.create({
          cssClass: 'mini',
          message: '验证码发送成功',
          position: 'bottom',
          duration: 2000
        });
        toast.present();
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

  goSubmit() {
    let params = {
      smsCode: this.form.value.msgCode,
    };
    this.userProvider.checkUserSMS(params).subscribe(
      () => {
        this.navCtrl.push(MeUpdatePage, {
          oldMobilePhone: this.form.value.phoneNum
        });
      }
    );
  }
}
