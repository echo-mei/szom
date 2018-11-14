import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MeUpdateUserPage} from '../me-update-user/me-update-user';
import { MeUpdatePasswordPage} from '../me-update-password/me-update-password';
import { MeUpdatePhonePage} from '../me-update-phone/me-update-phone';
import { MeSafePage } from '../me-safe/me-safe';

@Component({
  selector: 'page-me-update',
  templateUrl: 'me-update.html',
})
export class MeUpdatePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
    
  ) {
  }

  goUpdateUser(){
    this.navCtrl.push(MeSafePage, {
      operateType: 2
    });
  }

  goUpdatePassword(){
    this.navCtrl.push(MeSafePage, {
      operateType: 4
    });
  }

  goUpdatePhone(){
    this.navCtrl.push(MeSafePage, {
      oldMobilePhone: this.navParams.get('oldMobilePhone'),
      operateType: 3
    });
  }

}
