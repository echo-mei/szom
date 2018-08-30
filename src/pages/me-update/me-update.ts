import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MeUpdateUserPage} from '../me-update-user/me-update-user';
import { MeUpdatePasswordPage} from '../me-update-password/me-update-password';
import { MeUpdatePhonePage} from '../me-update-phone/me-update-phone';

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
    this.navCtrl.push(MeUpdateUserPage);
  }

  goUpdatePassword(){
    this.navCtrl.push(MeUpdatePasswordPage);
  }

  goUpdatePhone(){
    this.navCtrl.push(MeUpdatePhonePage);
  }

}
