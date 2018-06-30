import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddresslistOtherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addresslist-other',
  templateUrl: 'addresslist-other.html',
})
export class AddresslistOtherPage {

  organizationlist = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddresslistOtherPage');
    this.organizationlist = [
      {img:'img/slimer.png',text:'市委办公厅'},
      {img:'img/slimer.png',text:'市委政法委'},
      {img:'img/slimer.png',text:'市委宣传部'},
      {img:'img/slimer.png',text:'市委统战部'}
    ]
  }

  getTeamList() {
    this.navCtrl.push('TeamListPage');
  }
}
