import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Events, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { UserProvider } from '../../providers/user/user';
import { StorageProvider } from '../../providers/storage/storage';
import { MeUpdatePage } from '../me-update/me-update';
import { MeUpdateUserPage} from '../me-update-user/me-update-user';
import { MeUpdatePasswordPage} from '../me-update-password/me-update-password';
import { MeUpdatePhonePage} from '../me-update-phone/me-update-phone';
import { JSEncrypt } from 'jsencrypt';

@Component({
  selector: 'page-me-safe',
  templateUrl: 'me-safe.html',
})
export class MeSafePage {

  second:number;
  form: FormGroup;
  showPassword: boolean = false;
  operateType: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform,
    public statusBar: StatusBar,
    public formBuilder: FormBuilder,
    public userProvider: UserProvider,
    public storage: StorageProvider,
    public events: Events,
    public toastCtrl: ToastController
  ) {
    this.operateType = this.navParams.get('operateType');
    this.form = formBuilder.group({
      phoneNum: ['', Validators.compose([Validators.required])],
      password: [''],
      msgCode: ['']
    });
    // this.getMe();
  }

  getMe() {
    this.userProvider.getMobilePhone().subscribe(
      me => {
        // console.log(me)
        this.form.controls['phoneNum'].setValue(me.mobilePhone1);
        // this.form.controls['phoneNum'].setValue(18319509521);
      }
    );
  }

  isPhone() {
    let flag = this.form.controls['phoneNum'].value
      && /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.form.controls['phoneNum'].value);
    if (flag) {
      this.form.controls['password'].clearValidators();
      this.form.controls['password'].updateValueAndValidity();
      this.form.controls['msgCode'].setValidators([Validators.required]);
    } else {
      this.form.controls['msgCode'].clearValidators();
      this.form.controls['msgCode'].updateValueAndValidity();
      this.form.controls['password'].setValidators([Validators.required]);
    }
    return flag;
  }
  getSMSCode() {
    this.userProvider.getMobliePhoneSMSCode({mobilePhone: this.form.controls['phoneNum'].value, operateType: this.operateType}).subscribe(
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

  // sendRequest(fn, params){

  // }

  goSubmit() {    
    let params;
    let fn = 'validatorAccount';
    if(this.isPhone()){
      fn = 'validatorPhont';
      params = {
        accountNo: this.form.controls['phoneNum'].value,
        smsCode: this.form.controls['msgCode'].value,
        operateType: this.operateType
      }
    }else{
      params = {
        accountNo: this.form.controls['phoneNum'].value,
        password: this.form.controls['password'].value
      }
      this.userProvider.getRSAPublicKey().subscribe(
        (signKey) => {
          var encrypt = new JSEncrypt(); 
          encrypt.setPublicKey(signKey);
          params['password'] = encrypt.encrypt(this.form.controls['password'].value);
          console.log(params)
          this.userProvider[fn](params).subscribe(
            data => {
              switch(this.operateType){
                case 2: this.navCtrl.push(MeUpdateUserPage); break;
                case 3: this.navCtrl.push(MeUpdatePhonePage); break;
                case 4: this.navCtrl.push(MeUpdatePasswordPage); break;
              }
            }
          )
        }
      )
      return;
    }
    this.userProvider[fn](params).subscribe(
      data => {
        switch(this.operateType){
          case 2: this.navCtrl.push(MeUpdateUserPage); break;
          case 3: this.navCtrl.push(MeUpdatePhonePage); break;
          case 4: this.navCtrl.push(MeUpdatePasswordPage); break;
        }
      }
    )
  }
}
