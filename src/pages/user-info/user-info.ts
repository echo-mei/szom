import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddresslistProvider } from '../../providers/addresslist/addresslist';
/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {
  public personInfo:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public addresslistProvider: AddresslistProvider) {
    this.personInfo = navParams.get('personInfo')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
  }

  goDailyMe(){
    this.navCtrl.push('DailyMePage');
  }

}
